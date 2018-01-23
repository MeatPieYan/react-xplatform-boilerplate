import { takeLatest, all, call, put } from 'redux-saga/effects';

import * as actions from './action';
import { loadData } from '../../utils/service';

function* demoSaga() {
  const data = yield call(loadData, '/api/demo', 'post');
  yield put(actions.sagaAction(data));
}

export default function* () {
  yield all([
    takeLatest(actions.COM_DEMO, demoSaga)
  ]);
}
