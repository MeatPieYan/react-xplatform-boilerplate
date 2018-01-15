const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!za-piedom)/,
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  }
};
