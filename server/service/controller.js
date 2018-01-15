import { request } from '../../shared/utils/fetch';
import { getServerHost } from '../../shared/utils/utils';
import { commonService } from '../../shared/utils/service';

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
    // const result = await commonService(domain, path, 'post', data);
    const result = await commonService(domain, {path, method:'post', data});
    ctx.body = result;
    return next();
  } catch (e) {
    ctx.status = 500;
    ctx.body = e;
  }
};

const formatData = (domain = 'java') => async (ctx, next) => {
  const result = ctx.body;

  if (result && result.success) {
    ctx.status = 200;
    ctx.body = result.value;

    return next();
  }

  ctx.status = 500;
  ctx.body = result.errorMsg;
};

const sendCommonGW = (serviceName, method = 'post', serviceVersion = '1.0.0') => async (ctx, next) => {
  const data = method === 'post' ? ctx.request.body : {};
  const path = `/gateway/api?serviceName=${serviceName}&serviceVersion=${serviceVersion}`;
  const options = { path, method, data };
  if (ctx.session.sessionKey) {
    options['session-key'] = ctx.session.sessionKey;
  }
  try {
    const result = await commonService('commongw', options);
    ctx.body = result;
    return next();
  } catch (e) {
    ctx.status = 500;
    ctx.body = e;
  }
};

export default {
  sendReq,
  sendCommonGW,
  formatData
};
