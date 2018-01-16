// import { takeLatest, put, all } from 'redux-saga/effects';

// import { sagaAction } from '../pages/activity/activityA/action';

// function* test() {
//   // const data = yield call(() => fetch('//cnodejs.org/api/v1/topics').then(res => res.json()));
//   // debugger
//   yield put(sagaAction('123'));
// }

// export default function* () {
//   yield all([
//     takeLatest('ACTION_TEST_COM', test)
//   ]);
// }
import { fork } from 'redux-saga/effects';

import activitySaga from './activity/activitySaga';
import productSaga from './product/productSaga';

export default function* () {
  yield [
    fork(activitySaga),
    fork(productSaga)
  ];
}
