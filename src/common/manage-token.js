import cookie from 'cookie'
import getConfig from 'next/config'
import { hasPath } from 'ramda'

const { TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } = getConfig()

export const storeTokensInCookie = (token, refreshToken) => {
  document.cookie = cookie.serialize('token', token, { maxAge: TOKEN_MAX_AGE })
  document.cookie = cookie.serialize('refreshToken', refreshToken, {
    maxAge: REFRESH_TOKEN_MAX_AGE
  })
}

export const extractTokens = (context = {}) => {
  // we try to extract token from cookie
  const isServer = hasPath(['req', 'headers'], context)

  const cookieSource = isServer ? context.req.headers.cookie : document.cookie

  if (cookieSource) return cookie.parse(cookieSource)

  return {
    token: null,
    refreshToken: null
  }
}
