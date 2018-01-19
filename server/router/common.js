const Router = require('koa-router');

const { getNodeEnv } = require('../controller/common');

const commonRouter = new Router({ prefix: '/common' });

commonRouter.post('/env', getNodeEnv);

module.exports = commonRouter;
