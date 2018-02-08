const Router = require('koa-router');

const { getNodeEnv } = require('../controller/common');
const { sendCommonGW } = require('../utils/controller');

const commonRouter = new Router({ prefix: '/common' });

commonRouter.post('/env', getNodeEnv);

commonRouter.post('/logRecord', sendCommonGW('/logRecord/print'));

module.exports = commonRouter;
