import hoistStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import { extractTokens, checkTokens, storeTokensInCookie } from './manage-token'

import { redirect } from 'src/lib'

export const withAuth = ({ url } = { url: '/login' }) => (W) => {
  class WithAuth extends Component {
    static async getInitialProps(context) {
      const { refreshToken } = await extractTokens(context)

      let isAuthenticated = checkTokens(refreshToken)

      if (!isAuthenticated) {
        storeTokensInCookie(null, null, context)
        return redirect(context, url, { hard: true })
      }

      let pageProps = {}
      if (W.getInitialProps) {
        pageProps = await W.getInitialProps(context)
      }

      return { ...pageProps }
    }

    render() {
      return <W {...this.props} />
    }
  }

  return hoistStatics(WithAuth, W)
}
