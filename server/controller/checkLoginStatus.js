export default function (ctx, next) {
  if (ctx.session.sessionKey) {
    return next();
  }
  ctx.body = JSON.stringify({
    success: false,
    errorCode: 401,
    errorMsg: '身份验证失败'
  });
}
