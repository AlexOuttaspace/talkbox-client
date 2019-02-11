import { withClientState } from 'apollo-link-state'

import { localStateResolvers } from '../localState'

export const createStateLink = (cache, token, refreshToken) =>
  withClientState({
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
