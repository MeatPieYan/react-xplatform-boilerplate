import { get, post, request} from './fetch';
import { getServerHost } from './utils';

const sendReq = (platform, path, needWechatInfo = false) => async (ctx, next) => {
  const host = getServerHost(platform);
  const data = ctx.request.body;

  if (needWechatInfo) {
    Object.assign(data,ctx.request.body, {
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
    let result = await request(options);
    console.log(`call api ${path} response data: ${JSON.stringify(result)}`);
    if (result && result.success) {
      ctx.status = 200;
      ctx.body = result.value;

      return next();
    } else {
      ctx.status = 500;
      ctx.body = result.errorMsg;
    }
  } catch(e) {
    ctx.status = 500;
    ctx.body = e;
  }

}

const sendCommonGW = (serviceName, method = 'post', serviceVersion = '1.0.0') => async (ctx, next) => {
  const data = method === 'post' ? ctx.request.body : {};
  const path = `/gateway/api?serviceName=${serviceName}&serviceVersion=${serviceVersion}`;
  const host = ctx.utils.getServerHost('commongw');
  const options = {
    host,
    path,
    data,
    method: method,
    'Content-Type': 'application/json;charset=UTF-8'
  };

  if (data.sessionKey) {
    options['session-key'] = data.sessionKey;
  }

  console.log(`call api ${path} with data: ${JSON.stringify(options)}`);

  try {
    const result = await request(options);
    console.log(`call api ${path} response data: ${JSON.stringify(result)}`);
    if (result && result.success) {
      ctx.status = 200;
      ctx.body = result;

      return next();
    } else {
      ctx.status = 500;
      ctx.body = result.errorMsg;
    }
  } catch(e) {
    ctx.status = 500;
    ctx.body = e;
  }
}

export default {
  sendReq,
  sendCommonGW
}