import React from 'react';
import * as style from './style.scss';
import { PieComponent, pieConnect } from 'za-piehelper';
import * as action from './action';
import rootSaga from '../../redux/rootSaga';

class PayComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  componentDidMount() {
    const formData = this.refs.formData;
    const { location} = this.props;

    const { callPaymentParam } = location.state;
    if (callPaymentParam) {
      formData.action = location.state.callPaymentServerUrl;
      formData.submit();
    }
  }

  render() {
    debugger;
    const { location } = this.props
        ,{ callPaymentParam } = location.state;
    let arr = null;

    if (callPaymentParam) {
      arr = Object.keys(callPaymentParam).map(item => <input name={item} value={callPaymentParam[item]} key={item} readOnly='true' />);
    }

    return (
      <div>
        waiting
        <form className={style.form}
          ref='formData'
          method='post'
          target='_self'
          >
            {arr}
          </form>
      </div>
    );
  }
}

export default pieConnect(
  state=>({test: state.reducer.test.text})
)(PayComp);
