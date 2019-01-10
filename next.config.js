const { ANALYZE } = process.env

const publicRuntimeConfig = {
  // Will be available on both server and client
  GRAPHQL_ENDPOINT: 'http://localhost:3020/graphql',
  WS_ENDPOINT: 'ws://localhost:3020/graphql',
  TOKEN_MAX_AGE: 25 * 60, // 25 minutes in seconds
  REFRESH_TOKEN_MAX_AGE: 7 * 24 * 60 * 60, // 7 days in seconds
  DEVELOPMENT_MODE: process.env.NODE_ENV
}

const serverRuntimeConfig = {
  // Will only be available on the server side
}

module.exports = {
  publicRuntimeConfig,
  serverRuntimeConfig,

  webpack(config, { isServer }) {
    if (ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true
        })
      )
    }

    return config
  }
}
