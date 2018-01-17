import React from 'react';
import * as style from './style.scss';
import { PieComponent, pieConnect } from 'za-piehelper';
import * as action from './action';
import rootSaga from '../../redux/rootSaga';

class PayComp extends PieComponent {
  // static loadInitialData(store) {
  //   // return super.loadInitData(store, rootSaga, action.testAction);
  // }

  componentDidMount() {
    const { formData } = this.refs;
    const { location } = this.props;

    if (location.state) {
      formData.action = location.state.callPaymentServerUrl;
      formData.submit();
    }
  }

  render() {
    const { location } = this.props;
    let arr = null;

    if (location.state) {
      const { callPaymentParam } = location.state;
      arr = Object.keys(callPaymentParam).map(item => <input name={item} value={callPaymentParam[item]} key={item} readOnly='true' />);
    }

    return (
      <div>
        waiting
        <form
          className={style.form}
          ref='formData'
          method='post'
          target='_self' >
          {arr}
        </form>
      </div>
    );
  }
}

export default pieConnect(
  state=>({test: state.test.text})
)(PayComp);
