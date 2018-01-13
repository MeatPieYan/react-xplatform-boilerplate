
const payReq = require('../service/pay');

async function pay(ctx, next) {
  console.log('ctx', ctx);
  const data = await payReq(ctx.request.body);
  ctx.body = data;
  next();
}

export default pay;
