
async function pay(ctx, next) {
  console.log('ctx', ctx);
  ctx.status = 200;
  ctx.body = 'hello';
  next();
}


module.exports = {
  pay
};
