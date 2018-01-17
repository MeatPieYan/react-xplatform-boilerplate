
class AppBridge {
  constructor() {
    if (typeof window !== 'undefined') {
      const appSDK = window.ZAIAppJSInterface;
      if (appSDK instanceof Object) {
        this.appSDK = appSDK;
      } else {
        throw new Error('请在众安App中打开此页面');
      }
    }
  }
  commonMethod(...args) {
    return new Promise((resolve) => {
      // const paramsObj = {
      //   functionName: event,
      //   params,
      //   complete: resolve
      // };
      // this.prompt(JSON.stringify(paramsObj));

      // const cbFunc = Symbol('callbackFunction');
      const cbFunc = `ZAJSSDK_${args[0]}_CALLBACK`;
      window[cbFunc] = resolve;
      const params = Array.prototype.slice.call(args, 1);
      if (typeof this.appSDK[args[0]] === 'function') {
        this.appSDK[args[0]](...params, cbFunc);
      }
    });
  }
  /*
  * @param {type} 1.默认 2.微信好友 3.朋友圈 4.QQ好友 5.QQ空间 6.微博
  * @param {url} 分享链接
  * @param {imageUrl} 分享链接
  * @param {title} 分享title
  * @param {desc} 分享描述
  */
  share(option = {}) {
    const {
      type, url, imageUrl, title, desc
    } = option;
    return this.commonMethod('appLocalShare', type, url, imageUrl, title, desc);
  }
  setShareInfo(option) {
    const {
      type, url, imageUrl, title, desc
    } = option;
    return this.commonMethod('setAppLocalShareData', type, url, imageUrl, title, desc);
  }
  login(url) {
    return this.commonMethod('appUserLogin', url);
  }
  showLoading(show) {
    return this.commonMethod('showAppLocalProgress', show);
  }
}
export default new AppBridge();
