import cookie from 'cookie'
import getConfig from 'next/config'
import { hasPath } from 'ramda'
import decode from 'jwt-decode'

const { TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } = getConfig().publicRuntimeConfig

// if arguments' values are null, cookies will be eraser
export const storeTokensInCookie = (token, refreshToken, context = {}) => {
  if (context.res) {
    console.log(TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE)
    console.log(context.res.cookie)
    context.res.cookie('token', token, { maxAge: TOKEN_MAX_AGE })
    context.res.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_MAX_AGE
    })
    return
  }

  const tokenCookie =
    token !== null
      ? cookie.serialize('token', token, {
          maxAge: +TOKEN_MAX_AGE
        })
      : cookie.serialize('token', '', {
          maxAge: -1
        })

  const refreshTokenCookie =
    refreshToken !== null
      ? cookie.serialize('refreshToken', refreshToken, {
          maxAge: +REFRESH_TOKEN_MAX_AGE
        })
      : cookie.serialize('refreshToken', '', {
          maxAge: -1
        })

  document.cookie = tokenCookie
  document.cookie = refreshTokenCookie
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

// this function tries to decode tokens. if it fails, user is not authenticated
export const checkTokens = (token, refreshToken) => {
  try {
    decode(token)
    decode(refreshToken)
  } catch (error) {
    return false
  }

  return true
}
