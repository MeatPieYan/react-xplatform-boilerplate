const xPlatform = require('./x-platform');
const service = require('./serviceConfig');
const log4js = require('./log4js');

module.exports = {
  xPlatform,
  service,
  log4js: log4js[process.env.DEPLOY_ENV]
};
