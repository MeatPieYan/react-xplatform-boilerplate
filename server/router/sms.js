const Router = require('koa-router');
const { sendCommonGW } = require('../utils/controller');
const { rewriteParams } = require('../controller/sms');

const router = new Router();
const smsRouter = new Router({ prefix: '/SMSAuthCode' });
smsRouter.get('/', rewriteParams, sendCommonGW('SalesSendSms'));

router.use(smsRouter.routes());
module.exports = router;
