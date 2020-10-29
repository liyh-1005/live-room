const glob = require('glob')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    main: glob.sync('./src/component/vue-component/**/*.js').concat('./src/pages/main/index.js'),
    webview: path.join(__dirname, "src/pages/webview/index.js")
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name]-bundle.js"
  },

  resolve: {
    alias: {
      '@vue': 'vue/dist/vue.esm.js',
      '@assets': path.join(__dirname, 'src/assets'),
      '@config': path.join(__dirname, 'src/config'),
      '@util': path.join(__dirname, 'src/util'),
      '@core': path.join(__dirname, 'src/component/core'),
      '@component': path.join(__dirname, 'src/component'),
      '@commonVueComponent': path.join(__dirname, 'src/component/common-vue-component'),
      '@vueComponent': path.join(__dirname, 'src/component/vue-component'),
    },
    extensions: [".ts", '.js', ".vue"]
  },

  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        configFile: path.resolve(__dirname, ".babelrc")
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
      options: {}
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 5120, //小于5k base64
          name: '[path][name].[ext]'
        }
      }]
    }]
  },


  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}