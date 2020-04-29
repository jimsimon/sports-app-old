const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib')
  },
  resolve: {
    // Add `.ts`` as a resolvable extension
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.hbs?$/,
        use: 'handlebars-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.hbs')
    })
  ]
}
