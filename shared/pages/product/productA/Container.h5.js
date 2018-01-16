import React from 'react';
import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../../redux/rootSaga';
import * as style from './style.scss';

import T from '../../test.1';
import { get, post } from '../../../utils/fetch';
import { loadData } from '../../../utils/service';
// import Jssdk from '../../components/Jssdk/index';


class TestComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  componentDidMount() {
    this.props.testAction();
    post('/api/test/producer', { activityCode: 'MGM0003' }).then((res) => {
      console.log(res);
    });
    // loadData('/api/test/producer','post',{activityCode:'MGM0003'}).then(res=> {
    //   console.log(res);
    // })
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
  state => ({ test: state.product.productA.text })
)(TestComp);
