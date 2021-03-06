import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(context) {
    // intl
    const {
      req: { locale, localeDataScript },
      renderPage
    } = context

    // styled-components
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (p) => sheet.collectStyles(<App {...p} />))
    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      locale,
      localeDataScript,
      styleTags
    }
  }

  render() {
    const { locale, localeDataScript, styleTags } = this.props

    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`

    return (
      <html lang={locale}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          {styleTags}
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />

          <script src={polyfill} />
          <script dangerouslySetInnerHTML={{ __html: localeDataScript }} />

          <NextScript />
        </body>
      </html>
    )
  }
}

// eslint-disable-next-line import/no-default-export
export default MyDocument
