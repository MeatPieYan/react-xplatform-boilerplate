const { setSuccessRes } = require('../utils/utils');

const getNodeEnv = async (ctx) => {
  setSuccessRes(ctx, process.env.DEPLOY_ENV);
};

export default {
  getNodeEnv
};
