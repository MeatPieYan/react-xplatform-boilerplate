const Router = require('koa-router');
const { sendCommonGW } = require('../service/controller');
const writeAuthCookie = require('../controller/writeAuthCookie');
// const { verifySMSCode } = require('../controller/sms');

const router = new Router();
const loginRouter = new Router({ prefix: '/login' });

// loginRouter.post('/', (ctx, next) => {
//   // 设置默认短信模板
//   ctx.request.body = Object.assign({ checkPhoneMethod: 'sms', smsTemplateNo: 'tac_1608005' }, ctx.request.body);
//   return next();
// }, sendCommonGW('za.sales.zhongan.app.userPhone.saveAndVerify'), sendCommonGW('za.sales.zhongan.app.auth.login'), writeAuthCookie);

loginRouter.post('/', sendCommonGW('za.sales.zhongan.app.userPhone.saveAndVerify'), writeAuthCookie);

router.use(loginRouter.routes());
module.exports = router;
