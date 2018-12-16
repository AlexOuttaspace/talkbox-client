import React from 'react'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'

import { extractTokens } from './manage-token'
import { initApollo } from './init-apollo'

export const withApolloClient = (App) => {
  return class Apollo extends React.Component {
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

      // extract tokens from request headers and store them in apollo's cache (im not sure if this is the best way to do this)
      // const { token, refreshToken } = extractTokens(ctx.ctx)
      // apollo.cache.writeData({
      //   data: {
      //     authState: {
      //       __typename: 'authState',
      //       token,
      //       refreshToken
      //     }
      //   }
      // })

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()
      console.log('apollo state', apolloState)

      return {
        ...appProps,
        apolloState
      }
    }

    constructor(props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState)
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
