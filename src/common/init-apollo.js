import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import { defaultState } from './localState'

const {
  publicRuntimeConfig: { GRAPHQL_ENDPOINT, WS_ENDPOINT }
} = getConfig()

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState) {
  const cache = new InMemoryCache().restore(initialState || {})

  const stateLink = withClientState({
    cache,
    defaults: defaultState
  })

  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
  })

  const link = ApolloLink.from([stateLink, httpLink])

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
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
