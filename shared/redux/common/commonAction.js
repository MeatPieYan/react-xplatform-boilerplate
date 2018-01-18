
/**
 * ------------------------------------------------------------------
 * the constants of the actions
 * action的常量需要单独申明
 * COM/渠道_DST   公共action
 * PRO/渠道_DST   产品action
 * ACT/渠道_DST   活动action
 * ------------------------------------------------------------------
 */

export const COM_SEND_POINT_INFO = 'COM_SEND_POINT_INFO';
export const COM_PAY = 'COM_PAY';
export const COM_LOGIN = 'COM_LOGIN';

export const COM_APP_LOGIN = 'COM_APP_LOGIN';
export const COM_APP_SHARE = 'COM_APP_SHARE';
export const COM_APP_SET_TITLE = 'COM_APP_SET_TITLE';
export const COM_APP_LOADING = 'COM_APP_LOADING';

/**
 * ------------------------------------------------------------------
 * real actions
 * ------------------------------------------------------------------
 */

export const payAction = (data, callback) => ({ type: COM_PAY, payload: data, onSuccess: callback || null });
export const loginAction = data => ({ type: COM_LOGIN, payload: { text: data } });

// 发送埋点信息
export const sendPointInfo = () => ({ type: COM_SEND_POINT_INFO });

// app客户端调用
export const appLogin = data => ({ type: COM_APP_LOGIN, payload: { text: data } });
export const appShare = data => ({ type: COM_APP_SHARE, payload: { data } });
export const appSetTitle = title => ({ type: COM_APP_SET_TITLE, payload: { title } });
export const appShowLoading = show => ({ type: COM_APP_LOADING, payload: { show } });
