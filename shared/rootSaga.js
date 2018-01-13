import { takeLatest, put, call} from 'redux-saga/effects';
import 'isomorphic-fetch';
import { post } from './fetch';

import { sagaAction } from './pages/test/action';

function* test() {
  const data = yield call(()=>fetch('//offline-news-api.herokuapp.com/stories'));
  // debugger
  yield put(sagaAction(data.status));
}

function* zaPay(payload) {
  debugger;
  const data = yield call(() => post('/api/zaPay', payload.payload.data));
  console.log('data', data);
}

export default function* () {
  yield [
    takeLatest('ACTION_TEST', test),
    takeLatest('ACTION_PAY', zaPay)
  ];
}
