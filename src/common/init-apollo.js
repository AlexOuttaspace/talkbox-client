import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { createUploadLink } from 'apollo-upload-client'

import {
  createAfterwareLink,
  createAuthLink,
  createWsLink,
  createStateLink
} from './apollo-middleware'

const {
  publicRuntimeConfig: { GRAPHQL_ENDPOINT, DEVELOPMENT_MODE }
} = getConfig()

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState, { token = '', refreshToken = '' }) {
  const cache = new InMemoryCache().restore(initialState || {})
  // this link will handle refreshing of our tokens
  const afterwareLink = createAfterwareLink()

  // this link will extract token from apollo-link-state and add it to request's headers
  const authLink = createAuthLink()

  const wsLink = createWsLink()

  const stateLink = createStateLink(cache, token, refreshToken)

  const httpLink = createUploadLink({
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
