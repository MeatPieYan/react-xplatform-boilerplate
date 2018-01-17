import { takeLatest, put, all } from 'redux-saga/effects';

import { sagaAction } from './action';

function* activitySaga() {
  // const data = yield call(() => fetch('//cnodejs.org/api/v1/topics').then(res => res.json()));
  // debugger
  yield put(sagaAction('产品A'));
}

export default function* () {
  yield all([
    takeLatest('ACTION_SAGA_PROD', activitySaga)
  ]);
}
