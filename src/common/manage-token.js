import cookie from 'cookie'
import getConfig from 'next/config'
import { hasPath } from 'ramda'
import decode from 'jwt-decode'
import fetch from 'isomorphic-unfetch'

const {
  TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  GRAPHQL_ENDPOINT
} = getConfig().publicRuntimeConfig

// if arguments' values are null, cookies will be eraser
export const storeTokensInCookie = (token, refreshToken, context = {}) => {
  const tokenCookieValue = token ? token : ''
  const tokenMaxAge = token ? TOKEN_MAX_AGE : -1

  const refreshTokenCookieValue = refreshToken ? refreshToken : ''
  const refreshTokenMaxAge = refreshToken ? REFRESH_TOKEN_MAX_AGE : -1

  if (context.res) {
    context.res.cookie('token', tokenCookieValue, {
      maxAge: tokenMaxAge * 1000 // express accepts token maxage in ms, so we have to multiply by 1000
    })
    context.res.cookie('refreshToken', refreshTokenCookieValue, {
      maxAge: refreshTokenMaxAge * 1000 // express accepts token maxage in ms, so we have to multiply by 1000
    })
    return
  }

  const tokenCookie = cookie.serialize('token', tokenCookieValue, {
    maxAge: tokenMaxAge
  })

  const refreshTokenCookie = cookie.serialize(
    'refreshToken',
    refreshTokenCookieValue,
    {
      maxAge: refreshTokenMaxAge
    }
  )

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
export const checkTokens = (refreshToken) => {
  try {
    decode(refreshToken)
  } catch (error) {
    return false
  }

  return true
}

export const refreshTokens = async (refreshToken) => {
  try {
    const response = await fetch(`${GRAPHQL_ENDPOINT}?onlyRefreshToken=1`, {
      method: 'POST',
      headers: {
        'x-refresh-token': refreshToken
      }
    })

    return {
      newTokens: {
        token: response.headers.get(['x-token']),
        refreshToken: response.headers.get(['x-refresh-token'])
      }
    }
  } catch (error) {
    return {
      newTokens: {
        token: null,
        refreshToken: null
      }
    }
  }
}
