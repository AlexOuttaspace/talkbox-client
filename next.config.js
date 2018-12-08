const CircularDependencyPlugin = require('circular-dependency-plugin')

const { ANALYZE } = process.env

const publicRuntimeConfig = {
  // Will be available on both server and client
  GRAPHQL_ENDPOINT: 'http://localhost:3020/graphql',
  WS_ENDPOINT: `ws://localhost:3020/api/ws`
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

    config.plugins.push(
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // set the current working directory for displaying module paths
        cwd: process.cwd()
      })
    )

    return config
  }
}
