import { takeLatest, all, call } from 'redux-saga/effects';
import service from '../../utils/service';
import appBridge from '../../utils/AppBridge';
// import { LOAD_ENV } from './commonAction';

function* zaPay(action) {
  const data = yield call(service.loadData, '/api/zaPay', 'post', action.payload);
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

export default function* () {
  yield all([
    takeLatest('ACTION_PAY', zaPay),
    takeLatest('ACTION_APP_LOGIN', appLogin),
    takeLatest('ACTION_APP_SHARE', appShare),
    takeLatest('ACTION_APP_LOADING', appShowLoading)
  ]);
}
