const request = require('request');

const API = 'https://tac-gw-api-itest.zhongan.com/gateway/api?serviceName=za.sales.zhongan.app.auth.login&serviceVersion=1.0.0';

async function loginRequestToJava(body) {
  return new Promise((resolve, reject) => {
    body = JSON.stringify(body);
    const option = {
      url: API,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body
    };
    request(option, (err, httpResponse, data) => {
      if (err) {
        return reject(err);
      }
      data = JSON.parse(data) || {};
      if (data.success) {
        resolve(data.value);
      } else {
        reject(data.errorMsg);
      }
    });
  });
}

export default loginRequestToJava;

