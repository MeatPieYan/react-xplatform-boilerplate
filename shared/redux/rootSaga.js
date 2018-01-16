import { takeLatest, put, all } from 'redux-saga/effects';

import { sagaAction } from '../pages/test/action';

function* test() {
  // const data = yield call(() => fetch('//cnodejs.org/api/v1/topics').then(res => res.json()));
  // debugger
  yield put(sagaAction('123'));
}

export default function* () {
  yield all([
    takeLatest('ACTION_TEST', test)
  ]);
}
