import React, { Component } from 'react'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'

import { extractTokens } from './manage-token'
import { initApollo } from './init-apollo'

export const withApolloClient = (App) => {
  return class Apollo extends Component {
    static displayName = 'withApollo(App)'

    static async getInitialProps(ctx) {
      const { Component, router } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo()

      const { token, refreshToken } = extractTokens(ctx.ctx)

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
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

      // this will store tokens in apollo's cache
      const apollo = initApollo(props.apolloState)
      apollo.cache.writeData({
        data: {
          authState: {
            __typename: 'authState',
            token,
            refreshToken
          }
        }
      })

      this.apolloClient = apollo
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
