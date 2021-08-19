const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    app: './js/app.js'
    // index: './js/pageEntry/index.js',
    // page: './js/pageEntry/page.js'

  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
  },

  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
};


