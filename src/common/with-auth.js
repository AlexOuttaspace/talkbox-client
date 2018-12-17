import hoistStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import { extractTokens, checkTokens, storeTokensInCookie } from './manage-token'

import { redirect } from 'src/lib'

export const withAuth = ({ url } = { url: '/login' }) => (W) => {
  class WithAuth extends Component {
    static async getInitialProps(context) {
      const { token, refreshToken } = await extractTokens(context)

      // need to compare to string 'null' because that's how cookie.parser parses the token
      let isAuthenticated = checkTokens(token, refreshToken)

      if (!isAuthenticated) {
        storeTokensInCookie(1, 2, context)
        return redirect(context, url)
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
