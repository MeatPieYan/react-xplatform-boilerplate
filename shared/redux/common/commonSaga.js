import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { pieAction } from 'za-piehelper';

import * as actions from './commonAction';
import { loadData, sendUserAction, loadNodeEnv } from '../../utils/service';
import appBridge from '../../utils/AppBridge';
import { getSessionKey } from '../../utils/utils';

const envSelector = state => state.env;
const nodeEnvSelector = state => state.node.env;

function* zaPay(action) {
  try {
    const data = yield call(loadData, '/api/zaPay', 'post', action.payload);
    if (data.success) action.onSuccess({ pathname: '/pay', state: data.value });
  } catch (e) {
    yield put(actions.setMessage([e.message]));
  }
}

function* appLogin(action) {
  yield appBridge.login(action.payload.title);
}

function* appShare(action) {
  yield appBridge.share(action.payload.data);
}

function* appShowLoading() {
  yield appBridge.showLoading(true);
}

function* enterPage(action) {
  try {
    const { pageId, pageName } = action.payload;
    const env = yield select(envSelector);
    const postData = [{
      logTime: Date.now(),
      appType: '2',
      appId: 'h5',
      eventType: 'pv',
      sessionId: getSessionKey(),
      userId: getSessionKey(),
      clientIp: '',
      pageId,
      pageName: pageName || '',
      asmId: '',
      asmName: '',
      url: env.client ? env.client.url : '',
      queryParam: env.client ? env.client.search : '',
      scene: '',
      subscene: env.client ? env.client.query.subscene : '',
      extraInfo: '',
      platform: env.client ? env.client.details.os.name : '',
      system: env.client ? env.client.details.os.version : '',
      appVersion: '', // TODO
      sdkVersion: '', // TODO
      language: '',
      fontSizeSetting: '',
      brand: env.client ? env.client.details.device.manufacturer : '',
      model: env.client ? env.client.details.device.model : '',
      pixelRatio: '',
      screenWidth: '',
      screenHeight: '',
      windowWidth: '',
      windowHeight: '',
      resolution: ''
    }];

    let nodeEnv = yield select(nodeEnvSelector);
    if (!nodeEnv) nodeEnv = yield call(loadNodeEnv);

    console.log('发送pv:', postData);

    yield call(sendUserAction, nodeEnv, postData);
  } catch (e) {
    yield put(actions.setMessage([e.message]));
  }
}

function* sendPointInfo(action) {
  try {
    const xPath = action.payload;
    const env = yield select(envSelector);

    const postData = [{
      logTime: Date.now(),
      appType: '2',
      appId: 'h5', // TODO
      eventType: 'asm',
      sessionId: getSessionKey(),
      userId: getSessionKey(),
      clientIp: '',
      pageId: env.pageId,
      pageName: env.pageName || '',
      asmId: '',
      asmName: '',
      url: env.client ? env.client.url : '',
      queryParam: env.client ? env.client.search : '',
      scene: '',
      subscene: env.client ? env.client.query.subscene : '',
      extraInfo: {
        xPath
      },
      platform: env.client ? env.client.details.os.name : '',
      system: env.client ? env.client.details.os.version : '',
      appVersion: '', // TODO
      sdkVersion: '', // TODO
      language: '',
      fontSizeSetting: '',
      brand: env.client ? env.client.details.device.manufacturer : '',
      model: env.client ? env.client.details.device.model : '',
      pixelRatio: '',
      screenWidth: '',
      screenHeight: '',
      windowWidth: '',
      windowHeight: '',
      resolution: ''
    }];

    let nodeEnv = yield select(nodeEnvSelector);
    if (!nodeEnv) nodeEnv = yield call(loadNodeEnv);

    console.log('发送userAction:', postData);

    yield call(sendUserAction, nodeEnv, postData);
  } catch (e) {
    yield put(actions.setMessage([e.message]));
  }
}

function* getNodeEnv() {
  try {
    const env = yield call(loadNodeEnv);
    yield put(actions.loadNodeEnvSuccess(env));
  } catch (e) {
    yield put(actions.setMessage([e.message]));
  }
}

export default function* () {
  yield all([
    takeLatest(actions.COM_PAY, zaPay),
    takeLatest(actions.COM_APP_LOGIN, appLogin),
    takeLatest(actions.COM_APP_SHARE, appShare),
    takeLatest(actions.COM_APP_LOADING, appShowLoading),

    takeLatest(actions.COM_SEND_POINT_INFO, sendPointInfo),
    takeLatest(pieAction.GLOBAL_ENTER_PAGE, enterPage),

    takeLatest(actions.COM_LOAD_NODE_ENV.REQUEST, getNodeEnv)
  ]);
}
