import { takeLatest, all, call, select } from 'redux-saga/effects';
import { pieAction } from 'za-piehelper';

import * as actions from './commonAction';
import { loadData, sendUserAction } from '../../utils/service';
import appBridge from '../../utils/AppBridge';

const envSelector = state => state.env;

function* zaPay(action) {
  const data = yield call(loadData, '/api/zaPay', 'post', action.payload);
  if (data.success) action.onSuccess({ pathname: '/pay', state: data.value });
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
  const { pageId, pageName } = action.payload;
  const env = yield select(envSelector);
  const postData = {
    logTime: Date.now(),
    appType: '2',
    appId: 'h5', // TODO
    eventType: 'pv',
    sessionId: '', // TODO
    userId: '', // TODO
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
  };

  const nodeEnv = yield call(loadData, '/api/common/env');
  if (!nodeEnv.success) {
    // TODO
  }

  // yield call(sendUserAction, nodeEnv.value, postData);
}

function* sendPointInfo(action) {
  const xPath = action.payload;
  const env = yield select(envSelector);

  const postData = {
    logTime: Date.now(),
    appType: '2',
    appId: 'h5', // TODO
    eventType: 'asm',
    sessionId: '', // TODO
    userId: '', // TODO
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
  };

  const nodeEnv = yield call(loadData, '/api/common/env');
  if (!nodeEnv.success) {
    // TODO
  }

  yield call(sendUserAction, nodeEnv.value, postData);
}

export default function* () {
  yield all([
    takeLatest(actions.COM_PAY, zaPay),
    takeLatest(actions.COM_APP_LOGIN, appLogin),
    takeLatest(actions.COM_APP_SHARE, appShare),
    takeLatest(actions.COM_APP_LOADING, appShowLoading),
    takeLatest(actions.COM_SEND_POINT_INFO, sendPointInfo),
    takeLatest(pieAction.GLOBAL_ENTER_PAGE, enterPage)
  ]);
}
