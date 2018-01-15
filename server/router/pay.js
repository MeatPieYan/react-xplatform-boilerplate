
const { pay, cashier } = require('../controller/pay');
const Router = require('koa-router');

const router = new Router();
const payRouter = new Router({ prefix: '/zaPay' });

payRouter.post('/', pay);
payRouter.post('/cashier', (ctx, next) => {
  console.log('ctx.request.body---------------------------->', ctx.request.body);
  next();
}, cashier);

router.use(payRouter.routes());

module.exports = router;

