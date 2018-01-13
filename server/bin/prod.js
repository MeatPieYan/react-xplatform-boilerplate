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

const path = require('path');
const Pie = require('za-pie');
const session = require('koa-session');

const config = require('../../config/x-platform');

const SESSION_CONFIG = {
  key: 'za-session', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: false /** (boolean) signed or not (default true) */
};
// const app = new Pie(path.resolve(__dirname, '../../'), config);
const app = new Pie(path.resolve(__dirname, '../../'), config);
app.keys = ['some secret hurr'];

app.use(session(SESSION_CONFIG, app._app));
app.startUp();
