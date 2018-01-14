const Router = require('koa-router');
const { sendCommonGW } = require('../service/controller');

const router = new Router();
const testRouter = new Router({ prefix: '/login' });
testRouter.post('/', sendCommonGW('za.sales.zhongan.app.auth.login'));
router.use(testRouter.routes());
module.exports = router;
