
async function pay(ctx, next) {
  const { value } = ctx.body;
  if (value) {
    delete value.orderDetailResult;
    delete value.orderNo;
  }
  ctx.body = value || ctx.body;
  next();
}

export default {
  pay
};
