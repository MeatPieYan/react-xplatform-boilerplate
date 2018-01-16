const Router = require('koa-router');
const { sendCommonGW } = require('../utils/controller');

const router = new Router();
const smsRouter = new Router({ prefix: '/SMSAuthCode' });
smsRouter.get('/', (ctx, next) => {
  // 设置默认短信模板
  ctx.query = Object.assign({ templateNo: 'tac_1608005' }, ctx.query);
  return next();
}, sendCommonGW('SalesSendSms'));

router.use(smsRouter.routes());
module.exports = router;
