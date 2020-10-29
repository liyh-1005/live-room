const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js')

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const productionConfig = {
  mode: "production",
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }),

    new HtmlWebpackPlugin({
      chunks: ['main'],
      minify: {
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      },
      title: '空课',
      template: 'src/pages/main/index.html',
      filename: 'index.html'
    }),

    new HtmlWebpackPlugin({
      chunks: ['webview'],
      minify: {
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      },
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
module.exports = merge(baseConfig, productionConfig)