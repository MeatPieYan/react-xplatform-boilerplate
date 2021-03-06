const Router = require('koa-router');
const { sendReq, formatData } = require('../utils/controller');
const checkLoginStatus = require('../controller/checkLoginStatus');

const router = new Router();
const testRouter = new Router({ prefix: '/test' });
const demoRouter = new Router({ prefix: '/demo' });

testRouter.post('/producer', sendReq('activitygw', '/activityTplInfo/find/byCondition'), formatData('java'), async (ctx, next) => {
  console.log('test222');
  const data = ctx.body;
  ctx.status = 200;
  ctx.body = data;
  return next();
}

);
testRouter.get('/testLogin', checkLoginStatus, (ctx, next) => {
  console.log('checkLoginStatus OK');
  ctx.body = ctx.session.sessionKey;
  next();
});

testRouter.get('/test', ctx => ctx.redirect('http://localhost:8080/test'));

demoRouter.post('/', (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    test: 'demo'
  };
  next();
});

router.use(testRouter.routes());
router.use(demoRouter.routes());

module.exports = router;
