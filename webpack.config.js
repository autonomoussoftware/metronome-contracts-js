'use strict'

const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const library = 'metronome-contracts'
const outputFile = isProd ? `${library}.min.js` : `${library}.js`

module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, './src/index.js'),

  mode: isProd ? 'production' : 'development',

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: outputFile,
    libraryTarget: 'umd',
    library
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, './src')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, './src')]
      }
    ]
  },

  performance: {
    hints: false
  },

  devtool: isProd ? '#eval-source-map' : false
}
