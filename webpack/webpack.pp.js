const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const loaderUtils = require("loader-utils");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CrossPlatformPlugin = require('./cross-platform-plugin');


const baseConfig = require('./webpack.base');
const xPlatform = require('../config/x-platform');

const config = xPlatform.specialEnvList;
// const config = ['wx','h5']


const WPconfig = config.map(item =>
  merge(baseConfig, {
    entry: {
      [item.remark]: './client/index.js'
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, '../dist/client'),
      publicPath: '/client'
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      new UglifyJSPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../view/template.html'),
        filename: path.resolve(__dirname, `../dist/client/${item.remark}.html`)
      }),
      new ExtractTextPlugin('[name].[contenthash:8].css', { allChunks: true }),
      new CrossPlatformPlugin({ name: item.remark })
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  module: true,
                  localIdentName: '[path][name]__[local]',
                  getLocalIdent: (context, localIdentName, localName, options) => {
                    if (!options.context) {
                      options.context = context.options && typeof context.options.context === 'string' ? context.options.context : context.context;
                    }
                    const request = path.relative(options.context, context.resourcePath);
                    options.content = `${options.hashPrefix}${request}+${localName}`;

                    const _localIdentName = '[path][name]__[local]'.replace(/\[local\]/gi, localName);
                    const hash = loaderUtils.interpolateName(context, _localIdentName, options);
                    return `dist-${hash.replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-').replace(/^((-?[0-9])|--)/, '_$1')}`;
                  }
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
          })
        }
      ]
    }
  })
);


module.exports = WPconfig;
