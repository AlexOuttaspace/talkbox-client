import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { WebSocketLink } from 'apollo-link-ws'

import { storeTokensInCookie } from './manage-token'
import { localStateResolvers, getTokens } from './localState'

const {
  publicRuntimeConfig: { GRAPHQL_ENDPOINT, WS_ENDPOINT, DEVELOPMENT_MODE }
} = getConfig()

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState, { token = '', refreshToken = '' }) {
  const cache = new InMemoryCache().restore(initialState || {})
  // this link will handle refreshing of out tokens
  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const { headers, cache } = operation.getContext()

      // check if tokens were refreshed
      if (headers && headers['x-token'] && headers['x-refresh-token']) {
        const token = headers['x-token']
        const refreshToken = headers['x-refresh-token']

        const data = {
          authState: {
            __typename: 'authState',
            token,
            refreshToken
          }
        }

        cache.writeData({ data })
        if (typeof window !== 'undefined') {
          // make sure to only do this on client as this
          // will try to access window.document
          storeTokensInCookie(token, refreshToken)
        }
      }

      return response
    })
  })

  // this link will extract token from apollo-link-state and add it to request's headers
  const authLink = setContext((_, { headers, cache }) => {
    const {
      authState: { token, refreshToken }
    } = cache.readQuery({
      query: getTokens
    })

    return {
      headers: {
        ...headers,
        ['x-token']: token || '',
        ['x-refresh-token']: refreshToken || ''
      }
    }
  })

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: WS_ENDPOINT,
        options: {
          reconnect: true
        }
      })
    : null

  if (wsLink) {
    // pass token to client
    wsLink.subscriptionClient.use([
      {
        async applyMiddleware(options, next) {
          console.log(options)
          const { cache } = options.getContext()
          const {
            authState: { token, refreshToken }
          } = cache.readQuery({
            query: getTokens
          })

          options.context = { token, refreshToken }
          next()
        }
      }
    ])
  }

  const stateLink = withClientState({
    cache,
    defaults: {
      authState: {
        __typename: 'authState',
        token,
        refreshToken
      }
    },
    resolvers: localStateResolvers
  })

  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT
  })

  const httpLinkWithMiddleware = afterwareLink.concat(authLink.concat(httpLink))

  const httpLinkWithState = ApolloLink.from([stateLink, httpLinkWithMiddleware])

  const link = process.browser
    ? split(
        //only create the split in the browser
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query)
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLinkWithState
      )
    : httpLinkWithState

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser && DEVELOPMENT_MODE,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache
  })
}

export function initApollo(initialState, tokensArg) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, tokensArg)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, tokensArg)
  }

  return apolloClient
}
