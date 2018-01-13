import React from 'react';
import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../rootSaga';
import * as style from './style.scss';

import T from '../test.1';

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
  }

  zaPay() {
    const data = {
      "order": {
        "activityChannel": 500,
        "tradeType": "pc"
      },
      "orderDetails": [
        {
          "couponFee": 0,
          "payFee": 5,
          "productCategory": 3,
          "request": {
            "productCode": "ff633ad873686cf6b209a7e04f48aa1420debce913b9",
            "channelOrderNo": "OkNqHxWrK11c",
            "policyHolderType": "1",
            "policyHolderUserName": "绪寻绿",
            "policyHolderCertiType": "I",
            "policyHolderCertiNo": "510603198911029399",
            "policyHolderGender": "F",
            "policyHolderBirthDate": "19891102",
            "policyHolderPhone": "15803940945",
            "insuredUserName": "绪寻绿",
            "insuredCertiType": "I",
            "insuredCertiNo": "510603198911029399",
            "insuredGender": "F",
            "insuredPhone": "15607661780",
            "insuredBirthDay": "19891102",
            "insureDate": "20180111145435",
            "flightNo": "CZ3952",
            "flightDate": "20180111",
            "departureCode": "SHA",
            "destinationCode": "PEK",
            "premiumAmount": "5",
            "requireInvoice": "N",
            "contactMail": "lishijie001@qq.com",
            "extraInfo": {
              "accountNo": "DyRqTuTlNv",
              "isTicketNoExist": "N",
              "ticketNo": "7315642139013",
              "orderTotalFee": "5"
            }
          },
          "totalFee": 5
        }
      ],
      "orderRequestExtraInfo": {
        "registerZaAccountPhone": "18012341001",
        "backUrl": "/test",  // 交易关闭返回商户页面路径，可带一个参数。url中仅能包含数字，字母,-.~/#!:&%
        "returnUrl": "/test"  //页面跳转同步通知路径，不可带任何参数。url中仅能包含数字，字母,-.~/#!:&%
      }
    }

    this.props.dispatch(action.payAction(data));
  }

  render() {
    return (
      <div>
        <button onClick={this.zaPay}>submit</button>
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
