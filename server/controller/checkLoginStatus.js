const { setErrorRes } = require('../utils/utils');

export default function (ctx, next) {
  if (ctx.session.sessionKey) {
    return next();
  }
  setErrorRes(ctx, '身份验证失败', 401);
}
