/* eslint-disable */
const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style!css"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css']
  },
  devServer: {
    inline: true, // remove the webpack iframe
    stats: 'errors-only', // remove all of the 'built' messages
  }
};
