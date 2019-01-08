import React, { Component } from 'react'

import { checkTokens, storeTokensInCookie } from './manage-token'

import { redirect } from 'src/lib'

export const withAuth = ({ url } = { url: '/login' }) => (W) => {
  return class WithAuth extends Component {
    static async getInitialProps(context) {
      const { refreshToken } = context.authContext

      let isAuthenticated = checkTokens(refreshToken)

      if (!isAuthenticated) {
        storeTokensInCookie(null, null, context)
        return redirect(context, url, { hard: true })
      }

      let pageProps = {}
      if (W.getInitialProps) {
        pageProps = await W.getInitialProps(context)
      }

      return { pageProps, isAuthenticated }
    }

    render() {
      const { pageProps, isAuthenticated } = this.props

      if (!isAuthenticated) return null
      return <W {...pageProps} />
    }
  }
}
