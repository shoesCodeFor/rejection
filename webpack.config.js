const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
    //loaders: [
    //{
    //test: /\.css$/,
    //loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    //},
    //],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('[name].css'),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.PORT || 9000,
    host: process.env.HOST || '127.0.0.1',
  },
}
