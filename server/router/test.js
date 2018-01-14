const Router = require('koa-router');
const { sendReq, formatData } = require('../service/controller');


const router = new Router();
const testRouter = new Router({ prefix: '/test' });
testRouter.post('/producer', sendReq('activitygw', '/activityTplInfo/find/byCondition'), formatData('java'), async (ctx, next) => {
  console.log('test222');
  const data = ctx.body;
  ctx.status = 200;
  ctx.body = data;
  return next();
}

);

router.use(testRouter.routes());

module.exports = router;
