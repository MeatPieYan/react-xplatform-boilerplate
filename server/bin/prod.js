const cssModulesRequireHook = require('css-modules-require-hook');
const nodeSass = require('node-sass');
const path = require('path');
const Pie = require('za-pie');

const config = require('../../config/x-platform');

// scss compiler hook
cssModulesRequireHook({
  extensions: ['.scss'],
  preprocessCss: (data, filename) =>
    nodeSass.renderSync({
      data,
      file: filename
    }).css,
  camelCase: true,
  generateScopedName: '[path][name]__[local]'
});

const app = new Pie(path.resolve(__dirname, '../../'), config);

app.startUp();
