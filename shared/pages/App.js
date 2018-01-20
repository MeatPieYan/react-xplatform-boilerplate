import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { PieComponent, pieConnect } from 'za-piehelper';

import { getXPath } from '../utils/utils';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { sendPointInfo, loadNodeEnv } from '../redux/common/commonAction';

class App extends PieComponent {
  constructor() {
    super();

    this.onAnywhereClick = this.onAnywhereClick.bind(this);
  }

  componentWillMount() {
    this.props.loadNodeEnv();
  }

  onAnywhereClick(e) {
    this.props.sendPointInfo(getXPath(e.target));
  }

  render() {
    const {
      showLoading,
      errorMsg,
      showError
    } = this.props;
    return (
      <div onClick={this.onAnywhereClick}>
        <Loading isShow={showLoading} />
        {/* child routes won't render without this */}
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired
};

export default pieConnect(
  state => ({
    showLoading: state.uiState.showLoading,
    errorMsg: state.uiState.errorMsg,
    showError: state.uiState.showError,
    sendPointInfo,
    loadNodeEnv
  }),{
    sendPointInfo
  }
)(App);
