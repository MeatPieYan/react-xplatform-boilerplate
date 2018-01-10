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

const app = new Pie(path.resolve(__dirname, '../../'));
app.startUp();
