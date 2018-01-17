// const { sendCommonGW } = require('../service/controller');

const rewriteParams = async (ctx, next) => {
  // 设置默认短信模板
  ctx.query = Object.assign({ templateNo: 'tac_1608005' }, ctx.query);
  return next();
};

export default {
  rewriteParams
};
