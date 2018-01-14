const cssModulesRequireHook = require('css-modules-require-hook');
const nodeSass = require('node-sass');
const path = require('path');
const Pie = require('za-pie');

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


const config = require('../../config/x-platform');

const app = new Pie(path.resolve(__dirname, '../../'), config);
app.startUp();
