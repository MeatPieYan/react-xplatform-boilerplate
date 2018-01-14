// import { get, post, request } from '../../shared/fetch';
import { request } from '../../shared/utils/fetch';
import { getServerHost } from '../../shared/utils/utils';

const sendReq = (platform, path, needWechatInfo = false) => async (ctx, next) => {
  const host = getServerHost(platform);
  const data = ctx.request.body;

  if (needWechatInfo) {
    Object.assign(data, ctx.request.body, {
      openid: ctx.session.openid || '',
      unionid: ctx.session.unionid || ''
    });
  } else {
    Object.assign(data, ctx.request.body);
  }

  const options = {
    host,
    path,
    method: 'post',
    data
  };

  if (platform === 'php') {
    options['Content-Type'] = 'application/x-www-form-urlencoded';
  } else if (platform === 'java') {
    options['Content-Type'] = 'application/json';
  }

  console.log(`call api ${path} with data: ${JSON.stringify(options)}`);

  try {
    const result = await request(options);
    ctx.body = result;
    return next();
  } catch (e) {
    ctx.status = 500;
    ctx.body = e;
  }
};

const formatData = (platform = 'java') => async (ctx, next) => {
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
  const host = getServerHost('commongw');
  const options = {
    host,
    path,
    data,
    method,
    'Content-Type': 'application/json;charset=UTF-8'
  };

  console.log('sendCommonGW service');


  if (data.sessionKey) {
    options['session-key'] = data.sessionKey;
  }
  console.log(options);
  console.log(`call api ${path} with data: ${JSON.stringify(options)}`);

  try {
    const result = await request(options);
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
