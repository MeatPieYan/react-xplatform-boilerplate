import 'isomorphic-fetch';
const { post } = require('../../shared/fetch');

const API = 'https://tac-gw-api-itest.zhongan.com/gateway/api?serviceName=za.sales.zhongan.app.multiUnifiedOrder.createOrder&serviceVersion=1.0.0';
const cashierAPI = 'http://cashier.itest.zhongan.com/za-cashier-web/gateway.do';

function payReq(body) {
  return post(API, body);
}

export default {
  payReq
};
