const merge = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  mode: "development",
  devServer: {
    clientLogLevel: 'debug',
    hot: true
  }
})
