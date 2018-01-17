import { takeLatest, all, call } from 'redux-saga/effects';
import { request } from '../../utils/fetch';

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
  }).then(data => (
    data.success && payload.onSuccess({ pathname: '/pay', state: data.value })
  )));
}


export default function* () {
  yield all([
    takeLatest('ACTION_PAY', zaPay)
  ]);
}
