import React, { Component } from 'react'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import decode from 'jwt-decode'

import { getTokens } from './localState'
import {
  extractTokens,
  storeTokensInCookie,
  refreshTokens
} from './manage-token'
import { initApollo } from './init-apollo'

export const withApolloClient = (App) => {
  return class Apollo extends Component {
    static displayName = 'withApollo(App)'

    static async getInitialProps(appContext) {
      const { Component, router, ctx } = appContext

      // get tokens from request
      let { token, refreshToken } = extractTokens(ctx)

      // we check tokens. if they are invalid, we just remove them.
      if (token || refreshToken) {
        try {
          decode(refreshToken)
          if (token) decode(token)
        } catch (error) {
          token = null
          refreshToken = null
          storeTokensInCookie(token, refreshToken, ctx)
        }
      }

      // if token is expired, refresh
      if (!token && refreshToken) {
        const { newTokens } = await refreshTokens(refreshToken)
        token = newTokens.token
        refreshToken = newTokens.refreshToken
        storeTokensInCookie(token, refreshToken, ctx)
      }

      appContext.ctx.authState = { token, refreshToken }
      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(null, { token, refreshToken })

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              router={router}
              Component={Component}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        token,
        refreshToken,
        apolloState
      }
    }

    constructor(props) {
      super(props)

      const { token, refreshToken } = props
      const apollo = initApollo(props.apolloState, { token, refreshToken })

      this.apolloClient = apollo
    }

    componentDidMount = () => {
      const { token, refreshToken } = this.props
      storeTokensInCookie(token, refreshToken)
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
