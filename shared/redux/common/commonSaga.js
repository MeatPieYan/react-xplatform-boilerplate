import { takeLatest, all, call, put } from 'redux-saga/effects';
import { request } from '../../utils/fetch';
import { sagaAction } from '../../pages/test/action';
import appBridge from '../../utils/AppBridge';

function* zaPay(payload) {
  yield call(() => request({
    path: '/api/zaPay',
    data: payload.payload.data,
    method: 'POST'
  }).then(data => (
    data.success && payload.onSuccess({ pathname: '/pay', state: data.value })
  )));
}
function* test() {
  // const data = yield call(() => fetch('//cnodejs.org/api/v1/topics').then(res => res.json()));
  // debugger
  yield put(sagaAction('123'));
}

function* appLogin(action) {
  yield appBridge.login(action.payload.title);
}

function* appShare(action) {
  const data = yield appBridge.share(action.payload.data);
  yield put(sagaAction(JSON.stringify(data)));
}

function* appShowLoading() {
  yield appBridge.showLoading(true);
}

export default function* () {
  yield all([
    takeLatest('ACTION_PAY', zaPay),
    takeLatest('ACTION_TEST', test),
    takeLatest('ACTION_APP_LOGIN', appLogin),
    takeLatest('ACTION_APP_SHARE', appShare),
    takeLatest('ACTION_APP_LOADING', appShowLoading)
  ]);
}
