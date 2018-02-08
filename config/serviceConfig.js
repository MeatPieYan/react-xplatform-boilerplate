const serviceConfig = {
  dev: {
    test: {
      host: '127.0.0.1',
      port: process.env.MOCK_PORT || 3004,
      domain: `http://127.0.0.1:${process.env.MOCK_PORT || 3004}`
    },
    java: {
      domain: 'http://11146-tac-sales-za-comm-sales.test.za.net'
    },
    php: {
      domain: 'http://10.253.28.200/air_internat/xuejialiu'
    },
    wechat: {
      domain: 'http://wechat.zhongan.com/Dev_8XUA0HY/open/index.php'
    },
    commongw: {
      domain: 'http://tac-gw-api-itest.zhongan.com'
    },
    activitygw: {
      domain: 'http://13674-tac-sales-za-sales-activity.test.za.net'
    },
    userAction: {
      domain: 'https://tac-action-test.zhongan.com'
    }
  },
  test: {
    java: {
      domain: 'http://11146-tac-sales-za-comm-sales.test.za.net'
    },
    php: {
      domain: 'http://10.253.28.200/air_internat/xuejialiu'
    },
    wechat: {
      domain: 'https://wechat.zhongan.com/Dev_8XUA0HY/open/index.php'
    },
    commongw: {
      domain: 'http://tac-gw-api-itest.zhongan.com'
    },
    activitygw: {
      domain: 'http://13674-tac-sales-za-sales-activity.test.za.net'
    },
    userAction: {
      domain: 'https://tac-action-test.zhongan.com'
    }
  },
  pre: {
    java: {
      domain: 'http://tac-sales-za-comm-sales.pre.za.net'
    },
    php: {
      domain: 'http://10.253.9.176/air_internat'
    },
    wechat: {
      domain: 'https://wechat.zhongan.com/Uat_9U7D3Km/open/index.php'
    },
    commongw: {
      domain: 'http://tac-gw-api-uat.zhongan.com'
    },
    activitygw: {
      domain: 'http://13674-tac-sales-za-sales-activity.test.za.net'
    },
    userAction: {
      domain: 'https://tac-action-pre.zhongan.com'
    }
  },
  prd: {
    java: {
      domain: 'http://tac-sales-za-comm-sales.prd.za.net'
    },
    php: {
      domain: 'http://10.156.242.43/air_internat'
    },
    wechat: {
      domain: 'https://wechat.zhongan.com/open/index.php'
    },
    commongw: {
      domain: 'https://tac-gw-api.zhongan.com'
    },
    activitygw: {
      domain: 'http://13674-tac-sales-za-sales-activity.test.za.net'
    },
    userAction: {
      domain: 'https://tac-action.zhongan.com'
    }
  }
};

export default serviceConfig;
