const Router = require('koa-router');
const { sendCommonGW } = require('../utils/controller');
const writeAuthCookie = require('../controller/writeAuthCookie');

const router = new Router();
const loginRouter = new Router({ prefix: '/login' });

loginRouter.post('/', sendCommonGW('za.sales.zhongan.app.auth.login'), writeAuthCookie);

router.use(loginRouter.routes());
module.exports = router;
