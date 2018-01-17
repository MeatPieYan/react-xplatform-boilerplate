import { takeLatest, all, call } from 'redux-saga/effects';
import { request } from '../../utils/fetch';


function* zaPay(payload) {
  yield call(() => request({
    path: '/api/zaPay',
    data: payload.payload.data,
    method: 'POST'
  }).then(data => (
    data.success && payload.onSuccess({ pathname: '/pay', state: data.value })
  )));
}

function* login() {
  yield call(() => request({
    path: '/api/login',
    data: {
      activityChannel: 500,
      accessKey: 18782936341,
      smsVerificationCode: 8815
    },
    method: 'POST'
  }));
}


export default function* () {
  yield all([
    takeLatest('ACTION_PAY', zaPay),
    takeLatest('ACTION_LOGIN', login)
  ]);
}
