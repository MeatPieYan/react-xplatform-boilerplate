import React from 'react';
import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../rootSaga';
import * as style from './style.scss';

import T from '../test.1';

class TestComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  componentDidMount() {
    this.props.testAction();
  }

  render() {
    return (
      <div>
        <h2 className={style.color}>{this.props.test}</h2>
        h5 page
        <T />
      </div>
    );
  }
}

export default pieConnect(
  state=>({test: state.reducer.test.text})
)(TestComp);
