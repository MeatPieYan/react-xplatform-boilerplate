export default async function (ctx, next) {
  const { body } = ctx;
  const { value } = body || {};
  const { sessionKey } = value || {};
  if (sessionKey) {
    ctx.session = ctx.session || {};
    ctx.session.sessionKey = sessionKey;
  }
  next();
}

