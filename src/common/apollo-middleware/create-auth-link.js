import { setContext } from 'apollo-link-context'

import { getTokens } from '../localState'

export const createAuthLink = () =>
  setContext((_, { headers, cache }) => {
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
