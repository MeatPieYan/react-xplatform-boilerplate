import { fork } from 'redux-saga/effects';

import activityASaga from '../../pages/activity/activityA/saga';

export default function* () {
  yield [
    fork(activityASaga)
  ];
}
