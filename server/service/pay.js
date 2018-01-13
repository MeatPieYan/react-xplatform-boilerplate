const { post } = require('../../shared/fetch');

const API = 'https://tac-gw-api-itest.zhongan.com/gateway/intranet?serviceName=za.sales.zhongAnApp.multiUnifiedOrder.createOrder&serviceVersion=1.0.0';

async function payReq(body) {
  return post(API, body);
}

export default payReq;
