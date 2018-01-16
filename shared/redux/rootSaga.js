import { takeLatest, put, call, all } from 'redux-saga/effects';
import 'isomorphic-fetch';

import { sagaAction } from '../pages/test/action';
import { request } from '../utils/fetch';

function* test() {
  const data = yield call(() => fetch('//cnodejs.org/api/v1/topics').then(res => res.json()));
  // debugger
  yield put(sagaAction(JSON.stringify(data)));
}

function* zaPay(payload) {
  // const data1 = yield call(()=>{
  //   return fetch('/api/login', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       activityChannel: 500,
  //       accessKey: 18782936341,
  //       smsVerificationCode: 8815
  //     })
  //   });
  // });
  yield call(() => request({
    path: '/api/zaPay',
    data: payload.payload.data,
    method: 'POST'
  }).then(data => (payload.onSuccess(data))));
}

export default function* () {
  yield all([
    takeLatest('ACTION_TEST', test),
    takeLatest('ACTION_PAY', zaPay)
  ]);
}
