const Router = require('koa-router');

const { getNodeEnv } = require('../controller/common');
const { sendReq } = require('../utils/controller');

const commonRouter = new Router({ prefix: '/common' });

commonRouter.post('/env', getNodeEnv);

commonRouter.post('/logRecord', sendReq('commongw', '/logRecord/print'));

module.exports = commonRouter;
