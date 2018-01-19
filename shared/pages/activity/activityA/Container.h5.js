import React from 'react';
import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../../redux/rootSaga';
import * as style from './style.scss';

import T from '../../test.1';
import { get, post } from '../../../utils/fetch';
import { loadData } from '../../../utils/service';
// import Jssdk from '../../components/Jssdk/index';
import { comShowLoading, comHideLoading, comShowError } from '../../../redux/common/commonAction';


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
    post('/api/test/producer', { activityCode: 'MGM0003' }).then((res) => {
      console.log(res);
    });
    // this.props.comShowLoading();
  }

  showloading() {
    this.props.comShowLoading();
    // this.props.comHideLoading();
  }

  showError() {
    this.props.comShowError('errorMsgerrorMsgerrorMsgerrorMsgerrorMsgerrorMsgerrorMsgerrorMsgerrorMsgerrorMsgerrorMsg');
  }

  render() {
    return (
      <div>
        <h2 className={style.color}>{this.props.test}</h2>
        <h2 className={style.color}>{this.props.test}</h2>
        h5 page
        <T />
        <div onClick={this.showloading} >showloading</div>
        <button onClick={this.showError} >showError</button>
      </div>
    );
  }
}

TestComp.pageId = '123';

export default pieConnect(
  state => ({ test: state.activity.activityA.text }),
  {
    comShowLoading,
    comHideLoading,
    comShowError
  }
)(TestComp);
