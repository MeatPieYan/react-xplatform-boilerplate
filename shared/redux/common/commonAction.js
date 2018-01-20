import { createRequestTypes } from '../../utils/utils';

/**
 * ------------------------------------------------------------------
 * the constants of the actions
 * action的常量需要单独申明
 * COM_渠道_DST   公共action
 * PRO_渠道_DST   产品action
 * ACT_渠道_DST   活动action
 * ------------------------------------------------------------------
 */

export const COM_SEND_POINT_INFO = 'COM_SEND_POINT_INFO';
export const COM_PAY = 'COM_PAY';
export const COM_LOGIN = 'COM_LOGIN';
export const COM_LOAD_NODE_ENV = createRequestTypes('COM_LOAD_NODE_ENV');

export const COM_APP_LOGIN = 'COM_APP_LOGIN';
export const COM_APP_SHARE = 'COM_APP_SHARE';
export const COM_APP_SET_TITLE = 'COM_APP_SET_TITLE';
export const COM_APP_LOADING = 'COM_APP_LOADING';
export const COM_SET_UI_STATE = 'COM_SET_UI_STATE';

export const COM_UI_SHOW_LOADING = 'COM_UI_SHOW_LOADING';
export const COM_UI_HIDE_LOADING = 'COM_UI_HIDE_LOADING';
export const COM_UI_SHOW_ERROR = 'COM_UI_SHOW_ERROR';
export const COM_UI_HIDE_ERROR = 'COM_UI_HIDE_ERROR';


/**
 * ------------------------------------------------------------------
 * real actions
 * ------------------------------------------------------------------
 */

export const payAction = (data, callback) => ({ type: COM_PAY, payload: data, onSuccess: callback || null });
export const loginAction = data => ({ type: COM_LOGIN, payload: { text: data } });

// 发送埋点信息
export const sendPointInfo = xPath => ({ type: COM_SEND_POINT_INFO, payload: xPath });
export const loadNodeEnv = () => ({ type: COM_LOAD_NODE_ENV.REQUEST });
export const loadNodeEnvSuccess = env => ({ type: COM_LOAD_NODE_ENV.SUCCESS, payload: env });

// app客户端调用
export const appLogin = data => ({ type: COM_APP_LOGIN, payload: { text: data } });
export const appShare = data => ({ type: COM_APP_SHARE, payload: { data } });
export const appSetTitle = title => ({ type: COM_APP_SET_TITLE, payload: { title } });
export const appShowLoading = show => ({ type: COM_APP_LOADING, payload: { show } });

// set ui state
export const comSetUIState = data => ({ type: COM_SET_UI_STATE, payload: data });

// common ui
// loading 显示/隐藏
export const comShowLoading = () => ({ type: COM_UI_SHOW_LOADING });
export const comHideLoading = () => ({ type: COM_UI_HIDE_LOADING });
// error 显示/隐藏
export const comShowError = msg => ({ type: COM_UI_SHOW_ERROR, payload: { msg } });
export const comHideError = msg => ({ type: COM_UI_HIDE_ERROR, payload: { msg } });
