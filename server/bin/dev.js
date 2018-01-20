/* eslint-disable */
require('babel-polyfill');
require('babel-register')({
  presets: ['env'],
  plugins: ['add-module-exports', 'transform-object-rest-spread']
});

// scss compiler hook
require('css-modules-require-hook')({
  extensions: ['.scss'],
  preprocessCss: (data, filename) =>
      require('node-sass').renderSync({
          data,
          file: filename
      }).css,
  camelCase: true,
  generateScopedName: '[path][name]__[local]'
});

// image compiler hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 8192
});

const webpack = require('webpack');
const webpackConfig = require('../../../webpack/webpack.dev');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const convert = require('koa-convert');
const path = require('path');

const compiler = webpack(webpackConfig);

const Pie = require('za-pie');
const config = require('../../config');

const app = new Pie(path.resolve(__dirname, '../../'), config);

// add webpack-dev-server for development env
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  headers: { 'X-Custom-Header': 'yes' }
}));

// webpackHotMiddleware is for koa 1.x, so koa-convert is necessary,
// hope it will be upgraded.
// (Maybe a pull request for that npm module will make it effective more quickly)
app.use(convert(webpackHotMiddleware(compiler)));

app.startUp();
