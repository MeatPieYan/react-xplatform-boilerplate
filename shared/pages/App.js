import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { PieComponent, pieConnect } from 'za-piehelper';

import { getXPath } from '../utils/utils';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

class App extends PieComponent {
  onAnywhereClick(e) {
    console.log(getXPath(e.target));
    // this.props.dispatch()
  }

  render() {
    const {
      showLoading,
      errorMsg,
      showError
    } = this.props;
    return (
      <div onClick={this.onAnywhereClick.bind(this)}>
        <Loading isShow={showLoading} />
        <Error errorMsg={errorMsg} showError={showError} />
        <h1>Root</h1>
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
    showError: state.uiState.showError
  })
)(App);
