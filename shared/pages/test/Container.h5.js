import React from 'react';
import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../rootSaga';
import * as style from './style.scss';

import T from '../test.1';
import { get,post } from '../../fetch';
import { loadData } from '../../service';
import Jssdk from '../../components/Jssdk/index';


class TestComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  componentDidMount() {
    this.props.testAction();
    post('/api/test/producer',{activityCode:'MGM0003'}).then(res => {
      console.log(res);
    });
    // loadData('/api/test/producer','post',{activityCode:'MGM0003'}).then(res=> {
    //   console.log(res);
    // })
  }

  onWxReady(_wx) {
    alert('wx ready');
  }

  render() {
    return (
      <div>
        <Jssdk onWxReady={this.onWxReady}/>
        <h2 className={style.color}>{this.props.test}</h2>
        h5 page
        <T />
      </div>
    );
  }
}

export default pieConnect(
  state => ({ test: state.reducer.test.text })
)(TestComp);
