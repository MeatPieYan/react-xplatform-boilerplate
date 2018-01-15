import { takeLatest, put, call, all } from 'redux-saga/effects';
import 'isomorphic-fetch';

import { sagaAction } from '../pages/test/action';

function* test() {
  const data = yield call(() => fetch('//cnodejs.org/api/v1/topics').then(res => res.json()));
  // debugger
  yield put(sagaAction(JSON.stringify(data)));
}

function* zaPay(payload) {
  const data = yield call(() => {
    return fetch('/api/zaPay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.payload.data)
    })
    .then(res => res.json())
    .then( data => {
      payload.onSuccess(data);
    });
  });
}


export default function* () {
  yield all([
    takeLatest('ACTION_TEST', test),
    takeLatest('ACTION_PAY', zaPay)
  ]);
}
