const cssModulesRequireHook = require('css-modules-require-hook');
const nodeSass = require('node-sass');
const path = require('path');
const Pie = require('za-pie');
const assetHook = require('asset-require-hook');

const config = require('../../config');

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

// image compiler hook
assetHook({
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 8192
});

const app = new Pie(path.resolve(__dirname, '../../'), config);

app.startUp();
