import React from 'react';

import { PieComponent, pieConnect } from 'za-piehelper';

class PayComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  componentDidMount() {
    const formData = this.refs.formData;
    const { location} = this.props;

    const { callPaymentParam } = location.state;

    formData.action = location.state.callPaymentServerUrl;
    formData.submit();
  }

  render() {
    const { location } = this.props;
    const { callPaymentParam } = location.state;
    const arr = Object.keys(callPaymentParam).map(item => <input name={item} value={callPaymentParam[item]} key={item} readOnly='true' />);
    console.log(arr);
    return (
      <div>
        waiting
        <form
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
