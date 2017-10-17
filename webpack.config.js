const path = require('path')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'
const library = 'metronome'
const outputFile = isProd ? `${library}.min.js` : `${library}.js`

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: outputFile,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [path.resolve(__dirname, './src')]
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  devServer: {
    historyApiFallback: true,
    noInfo: false
  },

  performance: {
    hints: false
  },

  devtool: isProd ? '#eval-source-map' : false,
}