import hoistStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import { extractTokens } from './manage-token'

import { redirect } from 'src/lib'

export const withAuth = ({ url } = { url: '/login' }) => (W) => {
  class WithAuth extends Component {
    static async getInitialProps(context) {
      const { token } = await extractTokens(context)

      // need to compare to string 'null' because that's how cookie.parser parses the token
      const accessGranted = !!token && token !== 'null'

      if (!accessGranted) return redirect(context, url)

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
