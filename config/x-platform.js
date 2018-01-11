module.exports = {
  specialEnvList: [{
    name: 'za',
    userAgent: 'ZhongAnWebView',
    publicPath: 'client/za',
    remark: 'za'
  }, {
    name: 'wx',
    userAgent: 'MicroMessenger',
    publicPath: 'client/wx',
    remark: 'wx'
  }, {
    name: 'h5',
    userAgent: 'Chrome',
    publicPath: 'client/h5',
    remark: 'h5'
  }],
  defaultEnv: {
    name: 'default',
    publicPath: 'index'
  }
};
