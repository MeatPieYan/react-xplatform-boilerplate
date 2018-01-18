
/**
 * ------------------------------------------------------------------
 * the constants of the actions
 * action的常量需要单独申明
 * ------------------------------------------------------------------
 */
export const SEND_POINT_INFO = 'SEND_POINT_INFO';
export const ACTION_PAY = 'ACTION_PAY';
export const ACTION_LOGIN = 'ACTION_LOGIN';

export const ACTION_APP_LOGIN = 'ACTION_APP_LOGIN';
export const ACTION_APP_SHARE = 'ACTION_APP_SHARE';
export const ACTION_APP_SET_TITLE = 'ACTION_APP_SET_TITLE';
export const ACTION_APP_LOADING = 'ACTION_APP_LOADING';

/**
 * ------------------------------------------------------------------
 * real actions
 * ------------------------------------------------------------------
 */
export const payAction = (data, callback) => ({ type: ACTION_PAY, payload: data, onSuccess: callback || null });
export const loginAction = data => ({ type: ACTION_LOGIN, payload: { text: data } });

// 发送埋点信息
export const sendPointInfo = () => ({ type: SEND_POINT_INFO });

// app客户端调用
export const appLogin = data => ({ type: ACTION_APP_LOGIN, payload: { text: data } });
export const appShare = data => ({ type: ACTION_APP_SHARE, payload: { data } });
export const appSetTitle = title => ({ type: ACTION_APP_SET_TITLE, payload: { title } });
export const appShowLoading = show => ({ type: ACTION_APP_LOADING, payload: { show } });
