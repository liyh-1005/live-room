const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const developmentConfig = {
  mode: "development",

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['main'],
      title: '空课',
      template: 'src/pages/main/index.html',
      filename: 'index.html'
    }),

    new HtmlWebpackPlugin({
      chunks: ['webview'],
      title: '空课webview',
      template: 'src/pages/webview/index.html',
      filename: 'webview.html'
    }),

    new CopyWebpackPlugin({
      patterns: [{
        from: 'src/pages/login/login.html',
        to: 'login.html'
      }]
    })
  ]
}

module.exports = merge(baseConfig, developmentConfig)