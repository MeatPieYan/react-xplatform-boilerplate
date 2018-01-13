const loginRequestToJava = require('../service/login');
const qs = require('qs');

async function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = '';
      ctx.req.addListener('data', (data) => {
        postdata += data;
      });
      ctx.req.addListener('end', () => {
        const parseData = qs.parse(postdata);
        resolve(parseData);
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function login(ctx, next) {
  const postData = await parsePostData(ctx);
  let response = await loginRequestToJava(postData);
  response = response || {};
  console.log('login response =====> ', response);
  ctx.body = response.sessionKey;
  next();
}

export default login;
