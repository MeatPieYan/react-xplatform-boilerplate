
const { pay } = require('../controller/pay');
const Router = require('koa-router');
const { sendCommonGW } = require('../utils/controller');

const router = new Router();
const payRouter = new Router({ prefix: '/zaPay' });

payRouter.post('/', sendCommonGW('za.sales.zhongan.app.multiUnifiedOrder.createOrder'), pay);

router.use(payRouter.routes());

module.exports = router;

