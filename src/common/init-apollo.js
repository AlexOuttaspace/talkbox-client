import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import { getTokens } from './localState'
import { defaultState, localStateResolvers } from './localState'

const {
  publicRuntimeConfig: { GRAPHQL_ENDPOINT, WS_ENDPOINT, DEVELOPMENT_MODE }
} = getConfig()

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState) {
  const cache = new InMemoryCache().restore(initialState || {})

  // this link will extact token from apollo-link-state and add it to request's headers
  const authLink = setContext((_, { headers, cache }) => {
    const {
      authState: { token }
    } = cache.readQuery({
      query: getTokens
    })

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const stateLink = withClientState({
    cache,
    defaults: defaultState,
    resolvers: localStateResolvers
  })

  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT

    // Additional fetch() options like `credentials` or `headers` can be added here
  })

  const link = ApolloLink.from([stateLink, authLink.concat(httpLink)])

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser && DEVELOPMENT_MODE,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache
  })
}

export function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
