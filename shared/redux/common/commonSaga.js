import { takeLatest, all, call, put } from 'redux-saga/effects';
import * as actions from './commonAction';
import service from '../../utils/service';
import appBridge from '../../utils/AppBridge';
// import { LOAD_ENV } from './commonAction';

function* zaPay(action) {
  const data = yield call(service.loadData, '/api/zaPay', 'post', action.payload);
  if (data.success) action.onSuccess({ pathname: '/pay', state: data.value });
}

function* setUISate(key, value) {
  yield put(actions.comSetUIState({ key, value }));
}

function* comShowError(action) {
  yield put(actions.comSetUIState({ key: 'errorMsg', value: action.payload.msg }));
  yield put(actions.comSetUIState({ key: 'showError', value: true }));
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

export default function* () {
  yield all([
    takeLatest(actions.COM_PAY, zaPay),
    takeLatest(actions.COM_APP_LOGIN, appLogin),
    takeLatest(actions.COM_APP_SHARE, appShare),
    takeLatest(actions.COM_APP_LOADING, appShowLoading),
    takeLatest(actions.COM_UI_SHOW_LOADING, setUISate, 'showLoading', true),
    takeLatest(actions.COM_UI_HIDE_LOADING, setUISate, 'showLoading', false),
    takeLatest(actions.COM_UI_SHOW_ERROR, comShowError),
    takeLatest(actions.COM_UI_HIDE_ERROR, setUISate, 'showError', false)
  ]);
}
