import React from 'react';

import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../rootSaga';


class PayComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  componentWillMount() {
    // this.props.testAction();
    const formData = new FormData()
    const { location, dispatch } = this.props;

    console.log('this.props.location.state', location.state);
    Object.keys(location.state).map(item => {
      formData.append(item, location.state[item]);
    });
    dispatch(action.cashierAction(formData));
  }

  render() {
    return (
      <div>
        waiting
      </div>
    );
  }
}

export default pieConnect(
  state=>({test: state.reducer.test.text})
)(PayComp);
