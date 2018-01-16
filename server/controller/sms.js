// const { sendCommonGW } = require('../service/controller');

// 发送短信
const sendSMSAuthCode = async (ctx, next) => {
  console.log('==ctx.request.body====>', ctx.request.body);
  next();
};

// //验证短信
// const verifySMSCode = async function (ctx, next) {
//   let body = ctx.request.body;
//   const { smsVerificationCode } = body;
//   ctx.request.body = {}
//   sendCommonGW
//   next();
// };

export default {
  // verifySMSCode,
  sendSMSAuthCode
};
