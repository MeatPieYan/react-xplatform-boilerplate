import { post } from '../../fetch';
import { loadThirdPartyScript } from '../../utils';

const getJsConfig = (onReady) => {
  // alert('success');
  const resultPromise = post('/api/wechat/getSignSDK',{
    data: {
      href: encodeURIComponent(location.href)
    }
  });

  resultPromise.then((data) => {
    const result = data.body;
    // debugger;
    // console.log(result);
    wx.config({
      debug: false,
      appId: result.appId,
      timestamp: result.timestamp,
      nonceStr: result.nonceStr,
      signature: result.signature,
      jsApiList: ['onMenuShareTimeline',
        'onMenuShareAppMessage',
        'hideMenuItems'
      ],
      fail: (res) => {
        alert(JSON.stringify(res));
      }
    });

    wx.ready(() => {
      // alert('ready');
      // wx.onMenuShareTimeline({
      //   title: '123', // 分享标题
      //   link: 'https://tac-air.zhongan.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //   imgUrl: '', // 分享图标
      //   success() {
      //       // 用户确认分享后执行的回调函数
      //   },
      //   cancel() {
      //       // 用户取消分享后执行的回调函数
      //   }
      // });

      onReady(wx);
    });
  });
};

const loadJssdk = (onReady) => {
  const src = '//res.wx.qq.com/open/js/jweixin-1.3.0.js';

  loadThirdPartyScript(src, () => {
    getJsConfig(onReady);
  })
};

export default {
  loadJssdk
};
