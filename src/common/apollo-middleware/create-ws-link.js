import getConfig from 'next/config'
import { WebSocketLink } from 'apollo-link-ws'

import { extractTokens } from '../manage-token'

const {
  publicRuntimeConfig: { WS_ENDPOINT }
} = getConfig()

export const createWsLink = () =>
  process.browser
    ? new WebSocketLink({
        uri: WS_ENDPOINT,
        options: {
          reconnect: true,
          connectionParams: () => {
            const { token, refreshToken } = extractTokens()
            return { token, refreshToken }
          }
        }
      })
    : null
