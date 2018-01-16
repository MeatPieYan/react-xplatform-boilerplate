import { fork } from 'redux-saga/effects';

import productASaga from '../../pages/product/productA/saga';

export default function* () {
  yield [
    fork(productASaga)
  ];
}
