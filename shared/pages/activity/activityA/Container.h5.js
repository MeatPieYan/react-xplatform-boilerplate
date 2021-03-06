import React from 'react';
import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../../redux/rootSaga';
import * as style from './style.scss';

import { comShowLoading, comHideLoading, setMessage } from '../../../redux/common/commonAction';
import close from './close.png';

class TestComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  constructor() {
    super();
    this.showloading = this.showloading.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.props.testAction();
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
        <h2 className={style.color}>{this.props.test}</h2>
        <h2 className={style.color}>{this.props.test}</h2>
        h5 page
        <button onClick={this.showloading} >showloading</button>
        <button onClick={this.showError} >showError</button>
        <img src={close} alt='' />
      </div>
    );
  }
}

TestComp.pageId = '123';
TestComp.pageName = 'abc';
TestComp.pageTitle = '123';

export default pieConnect(
  state => ({ test: state.activity.activityA.text }),
  {
    comShowLoading,
    comHideLoading,
    setMessage
  }
)(TestComp);
