
const { payReq, cashierReq } = require('../service/pay');

async function pay(ctx, next) {
  // const data = await payReq(ctx.request.body);
  const data = {
    "errorCode":null,
    "errorMsg":null,
    "extraInfo":null,
    "success":true,
    "value":
      {
        "timeStamp":"1515931134",
        "orderNo":"20720180114195850000000001394001",
        "package":"prepay_id=wx20180114195853fcc6f5e9c70534461797",
        "orderDetailResult":[{"errorCode":null,"errorMsg":null,"extraInfo":null,"success":true,"value":null},{"errorCode":null,"errorMsg":null,"extraInfo":null,"success":true,"value":null}],
        "paySign":"97F0CED611D4DAF071AF65DCDF309AB5",
        "groupOrderNo":"207180114195850000048001",
        "signType":"MD5",
        "nonceStr":"6cb120f03ff94d2097825fdab942dcc6"
      }
    }
  const value = data.value;
  delete value.orderDetailResult;
  delete value.orderNo;
  ctx.body = value;
  next();
}

async function cashier(ctx, next) {
  const data = await cashierReq(ctx.request.body);
  console.log('data---------------------------->', data);
  ctx.body = data;
  next();
}

export default {
  pay,
  cashier
};
