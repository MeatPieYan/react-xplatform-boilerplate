import React from 'react';
import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../../redux/rootSaga';
import * as style from './style.scss';
import FinalFieldLevelValidationForm from './form';
import T from '../../test.1';

class TestComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  componentDidMount() {
    this.props.productSaga();
  }

  render() {
    return (
      <div>
        <h2 className={style.color}>{this.props.test}</h2>
        wx page
        <FinalFieldLevelValidationForm />
        <T />
      </div>
    );
  }
}
TestComp.projectType = 'product';

export default pieConnect(
  state => ({ test: state.product.productA.text })
)(TestComp);
