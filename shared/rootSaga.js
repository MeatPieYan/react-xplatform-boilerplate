import { takeLatest, put, call} from 'redux-saga/effects';
import 'isomorphic-fetch';
import { post } from './fetch';
import { sagaAction } from './pages/test/action';

function* test() {
  const data = yield call(() => fetch('//offline-news-api.herokuapp.com/stories'));
  // debugger
  yield put(sagaAction(data.status));
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
  console.log('data', data);
}

function* cashier(payload){
  const data = yield call(() => {
    return fetch('http://cashier.itest.zhongan.com/za-cashier-web/gateway.do', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
      },
      body: payload.payload.data
    })
  });
  console.log('data', data);
}

export default function* () {
  yield [
    takeLatest('ACTION_TEST', test),
    takeLatest('ACTION_PAY', zaPay),
    takeLatest('ACTION_CASHIER', cashier)
  ];
}
