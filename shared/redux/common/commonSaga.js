import { takeLatest, all, call } from 'redux-saga/effects';
import service from '../../utils/service';

function* zaPay(action) {
  const data = yield call(service.loadData, '/api/zaPay', 'post', action.payload);
  if (data.success) action.onSuccess({ pathname: '/pay', state: data.value });
}

function* login() {
  const data = {
    activityChannel: 500,
    accessKey: 18782936341,
    smsVerificationCode: 8815
  };
  yield call(service.loadData, '/api/login', 'post', data);
}


export default function* () {
  yield all([
    takeLatest('ACTION_PAY', zaPay),
    takeLatest('ACTION_LOGIN', login)
  ]);
}
