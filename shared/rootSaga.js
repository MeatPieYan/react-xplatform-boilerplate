import { takeLatest, put } from 'redux-saga/effects';
import 'isomorphic-fetch';

import { sagaAction } from './pages/test/action';

function* test() {
  // const data = yield call(()=> fetch('//offline-news-api.herokuapp.com/stories'));
  // debugger
  yield put(sagaAction(200));
}

export default function* () {
  yield [
    takeLatest('ACTION_TEST', test)
  ];
}
