import React from 'react'
import App, { Container } from 'next/app'
import { addLocaleData, IntlProvider } from 'react-intl'
import { ApolloProvider } from 'react-apollo'

import { GlobalStyles } from 'src/theme'
import { withApolloClient } from 'src/common'

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx

    const reqData = req || window.__NEXT_DATA__.props

    const { locale, messages } = reqData

    return { pageProps, locale, messages }
  }

  render() {
    const { Component, pageProps, locale, messages, apolloClient } = this.props
    const now = Date.now()

    return (
      <Container>
        <IntlProvider locale={locale} messages={messages} initialNow={now}>
          <ApolloProvider client={apolloClient}>
            <GlobalStyles />
            <Component {...pageProps} />
          </ApolloProvider>
        </IntlProvider>
      </Container>
    )
  }
}

// eslint-disable-next-line import/no-default-export
export default withApolloClient(MyApp)
