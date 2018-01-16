const config = require('../../config/serviceConfig');

const getServerHost = serverName => config[process.env.DEPLOY_ENV || 'dev'][serverName].domain;

const result = {
  success: false,
  errorMsg: '',
  value: {}
};

const setErrorRes = (ctx, errorMsg, status = 200) => {
  result.success = false;
  result.errorMsg = errorMsg;
  result.value = {};

  ctx.status = status;
  ctx.body = result;
};

const setSuccessRes = (ctx, value) => {
  result.success = true;
  result.errorMsg = '';
  result.value = value;

  ctx.status = 200;
  ctx.body = result;
};

module.exports = {
  setErrorRes,
  setSuccessRes,
  getServerHost
};
