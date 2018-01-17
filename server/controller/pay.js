
async function pay(ctx, next) {
  const { value } = ctx.body;
  const isEmpty = Object.keys(value).length;
  if (isEmpty) {
    delete value.orderDetailResult;
    delete value.orderNo;
  }
  ctx.body = ctx.body;
  next();
}

export default {
  pay
};
