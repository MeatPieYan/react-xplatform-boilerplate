const Router = require('koa-router');
const { sendCommonGW } = require('../service/controller');
const writeAuthCookie = require('../controller/writeAuthCookie');

const router = new Router();
const testRouter = new Router({ prefix: '/login' });
testRouter.post('/', sendCommonGW('za.sales.zhongan.app.auth.login'), writeAuthCookie);
router.use(testRouter.routes());
module.exports = router;
