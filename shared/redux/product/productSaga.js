import { fork } from 'redux-saga/effects';

import demoSaga from '../../pages/demo/saga';

export default function* () {
  yield [
    fork(demoSaga)
  ];
}
