import React from 'react';
// import 'isomorphic-fetch';

import { PieComponent, pieConnect } from 'za-piehelper';

import * as action from './action';
import rootSaga from '../../redux/rootSaga';
import * as style from './style.scss';
import { appLogin, appShare, appShowLoading } from '../../redux/common/commonAction';

class TestComp extends PieComponent {
  static loadInitialData(store) {
    return super.loadInitData(store, rootSaga, action.testAction);
  }
  constructor() {
    super();
    this.appLogin = this.appLogin.bind(this);
    this.appShare = this.appShare.bind(this);
    this.appShowLoading = this.appShowLoading.bind(this);
  }
  componentDidMount() {
    this.props.testAction();
  }
  appLogin() {
    this.props.appLogin('http://www.baidu.com');
  }
  appShare() {
    this.props.appShare({
      type: 1,
      url: 'https://www.baidu.com',
      imageUrl: 'https://tac-cdn.zhongan.com/wxapp/wxapp_traval_ins_in_one/btn-add.png',
      title: '测试链接',
      desc: '测试分享描述desc'
    });
  }
  appSetTitle() {
    this.props.appSetTitle();
  }
  appShowLoading() {
    this.props.appShowLoading();
  }
  render() {
    return (
      <div>
        <h2 className={style.color}>{this.props.test}</h2>
        <button onClick={this.appLogin}>登录</button>
        <button onClick={this.appShare}>分享</button>
        <button onClick={this.appShowLoading}>调用loading</button>
      </div>
    );
  }
}

export default pieConnect(
  state => ({ test: state.activity.test.text }), {
    appLogin,
    appShare,
    appShowLoading
  }
)(TestComp);
