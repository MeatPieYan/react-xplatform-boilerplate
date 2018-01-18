import React from 'react';
// import 'isomorphic-fetch';

import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import * as comAction from '../../redux/common/commonAction';
import rootSaga from '../../redux/rootSaga';
import * as style from './style.scss';

class TestComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }

  constructor() {
    super();
    this.zaPay = this.zaPay.bind(this);
  }

  componentDidMount() {
    this.props.testAction();
    this.props.dispatch(comAction.loginAction());
  }

  zaPay() {
    const data = {
      order: {
        tradeType: 'pc'
      },
      orderDetails: [
        {
          couponFee: 0,
          payFee: 5,
          productCategory: 3,
          request: {
            productCode: 'ff633ad873686cf6b209a7e04f48aa1420debce913b9',
            channelOrderNo: 'OkNqHxWrK11c',
            policyHolderType: '1',
            policyHolderUserName: '绪寻绿',
            policyHolderCertiType: 'P',
            policyHolderCertiNo: '510603198911029399',
            policyHolderGender: 'F',
            policyHolderBirthDate: '19891102',
            policyHolderPhone: '15803940945',
            insuredUserName: '绪寻绿',
            insuredCertiType: 'P',
            insuredCertiNo: '510603198911029399',
            insuredGender: 'F',
            insuredPhone: '15607661780',
            insuredBirthDay: '19891102',
            insureDate: '20180111145435',
            flightNo: 'MU5152',
            flightDate: '20180120',
            departureCode: 'SHA',
            destinationCode: 'PEK',
            premiumAmount: '5',
            requireInvoice: 'N',
            contactMail: 'lishijie001@qq.com',
            extraInfo: {
              accountNo: 'DyRqTuTlNv',
              isTicketNoExist: 'N',
              ticketNo: '7315642139013',
              orderTotalFee: '5'
            }
          },
          totalFee: 5
        }
      ],
      orderRequestExtraInfo: {
        backUrl: 'http://tac-gw-api-itest.zhongan.com',
        returnUrl: 'http://tac-gw-api-itest.zhongan.com'
      }
    };

    const { history } = this.props;

    this.props.dispatch(comAction.payAction(data, history.push));
  }

  render() {
    return (
      <div>
        <button onClick={this.zaPay}>submit</button>
        <h2 className={style.color}>{this.props.test}</h2>
      </div>
    );
  }
}

export default pieConnect(
  state => ({ test: state.activity.activityA.text })
)(TestComp);
