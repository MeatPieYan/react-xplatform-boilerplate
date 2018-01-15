const Router = require('koa-router');
const { sendCommonGW } = require('../service/controller');
const writeAuthCookie = require('../controller/writeAuthCookie');
const checkLoginStatus = require('../controller/checkLoginStatus');

const router = new Router();
const testRouter = new Router({ prefix: '/login' });
testRouter.post('/', sendCommonGW('za.sales.zhongan.app.auth.login'), writeAuthCookie);

testRouter.get('/testLogin', checkLoginStatus, (ctx, next) => {
  console.log('checkLoginStatus OK');
  ctx.body = ctx.session.sessionKey;
  next();
});


router.use(testRouter.routes());
module.exports = router;
