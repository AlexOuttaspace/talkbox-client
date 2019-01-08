import React, { Component } from 'react'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import decode from 'jwt-decode'

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

      if (!token && refreshToken) {
        // refresh token if expired
        const { newTokens } = await refreshTokens(refreshToken)
        token = newTokens.token
        refreshToken = newTokens.refreshToken
        storeTokensInCookie(token, refreshToken, ctx)
      }

      const apollo = initApollo(null, { token, refreshToken })

      appContext.ctx.apolloClient = apollo
      appContext.ctx.authContext = { token, refreshToken }
      // need this property to determine whether app is inside getDataFromTree
      appContext.ctx.apolloExtractData = true
      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext)
      }

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
      const apolloClient = initApollo(apolloState, { token, refreshToken })
      appContext.ctx.apolloExtractData = false
      appContext.ctx.apolloClient = apolloClient
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext)
      }

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

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
