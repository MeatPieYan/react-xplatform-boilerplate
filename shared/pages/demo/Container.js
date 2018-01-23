import React from 'react';
import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../redux/rootSaga';
import * as style from './style.scss';
import { comShowLoading, comHideLoading, setMessage } from '../../redux/common/commonAction';
import close from './assets/close.png';

class DemoComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.demoAction);
  }

  constructor() {
    super();
    this.showloading = this.showloading.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.props.demoAction();
  }

  showloading() {
    this.props.comShowLoading();
  }

  showError() {
    this.props.setMessage(['123', '123']);
  }

  render() {
    return (
      <div>
        <h2 className={style.color}>{ this.props.text }</h2>
        h5 page
        <button onClick={this.showloading} >showloading</button>
        <button onClick={this.showError} >showError</button>
        <img src={close} alt='' />
      </div>
    );
  }
}

DemoComp.pageId = '123';
DemoComp.pageName = 'demo';
DemoComp.pageTitle = 'Demo';

export default pieConnect(
  state => ({ text: state.product.demo.text }),
  {
    demoAction: action.demoAction,
    comShowLoading,
    comHideLoading,
    setMessage
  }
)(DemoComp);
