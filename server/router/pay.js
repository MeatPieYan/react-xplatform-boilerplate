
const pay = require('../controller/pay');
const Router = require('koa-router');

const router = new Router();
const payRouter = new Router({ prefix: '/zaPay' });

payRouter.post('/', async (ctx,next) => {
  console.log('ctx.body ********* ',ctx.body);
  return next();
},pay);

router.use(payRouter.routes());

module.exports = router;

