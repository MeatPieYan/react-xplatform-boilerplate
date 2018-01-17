const { commonService } = require('./services');
const { setErrorRes, setSuccessRes } = require('./utils');

const sendReq = (domain, path, needWechatInfo = false) => async (ctx, next) => {
  const data = ctx.request.body;

  if (needWechatInfo) {
    Object.assign(data, ctx.request.body, {
      openid: ctx.session.openid || '',
      unionid: ctx.session.unionid || ''
    });
  } else {
    Object.assign(data, ctx.request.body);
  }

  try {
    const result = await commonService(domain, { path, method: 'post', data });
    ctx.body = 200;
    ctx.body = result;
    return next();
  } catch (e) {
    setErrorRes(ctx, e.message);
  }
};

const formatData = () => async (ctx, next) => next();

const sendCommonGW = (serviceName, method = 'post', serviceVersion = '1.0.0') => async (ctx, next) => {
  const data = method === 'post' ? ctx.request.body : {};
  if (ctx.query) Object.assign(data, ctx.query);
  const path = `/gateway/api?serviceName=${serviceName}&serviceVersion=${serviceVersion}`;
  const options = { path, method, data };
  if (ctx.session.sessionKey) {
    options['session-key'] = ctx.session.sessionKey;
  }
  // options['session-key'] = 'ea46096b115b49c5a4ef7c5a6db44236';
  // console.log(options);
  // console.log(`call api ${path} with data: ${JSON.stringify(options)}`);

  try {
    const result = await commonService('commongw', options);

    if (result && result.success) {
      setSuccessRes(ctx, result.value);
    } else {
      setErrorRes(ctx, result.errorMsg);
    }

    return next();
  } catch (e) {
    setErrorRes(ctx, e.message);
  }
};

export default {
  sendReq,
  sendCommonGW,
  formatData
};
