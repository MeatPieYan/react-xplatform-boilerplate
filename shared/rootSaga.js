import { takeLatest, put, call} from 'redux-saga/effects';
import 'isomorphic-fetch';

import { sagaAction } from './pages/test/action';

function* test() {
  const data = yield call(()=>fetch('//offline-news-api.herokuapp.com/stories'));
  // debugger
  yield put(sagaAction(data.status));
}

function* zaPay(payload) {
  const data = yield call(() =>fetch ('/api/zaPay', {
    method: 'post',
    body: JSON.stringify(payload.payload.data)
  })
  );
  console.log('data', data);
}

export default function* () {
  yield [
    takeLatest('ACTION_TEST', test),
    takeLatest('ACTION_PAY', zaPay)
  ];
}
