import { ApolloLink } from 'apollo-link'

import { storeTokensInCookie } from '../manage-token'

export const createAfterwareLink = () =>
  new ApolloLink((operation, forward) => {
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
