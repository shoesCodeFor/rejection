const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    //    loaders: [
    //      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    //    ],
  },
  plugins: [HtmlWebpackPluginConfig],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.PORT || 9000,
    host: process.env.HOST || '127.0.0.1',
  },
}
