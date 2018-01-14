const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const CrossPlatformPlugin = require('./cross-platform-plugin');

module.exports = merge(baseConfig, {
  entry: {
    app: [
      './client/index.js',
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  devServer: {
    contentBase: '../dist',
    hot: true
  },
  devtool: 'source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../view/template.html'),
      filename: path.resolve(__dirname, `../dist/client/${process.env._PLATFORM_}.html`),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new CrossPlatformPlugin({ name: process.env._PLATFORM_ })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[path][name]__[local]'
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              module: true
            }
          }
        ]
      }
    ]
  }
});
