import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { PieComponent, pieConnect } from 'za-piehelper';

import { getXPath } from '../utils/utils';
import { sendPointInfo } from '../redux/common/commonAction';

class App extends PieComponent {
  onAnywhereClick(e) {
    this.props.sendPointInfo(getXPath(e.target));
  }

  render() {
    return (
      <div onClick={this.onAnywhereClick.bind(this)}>
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

export default pieConnect(null, {
  sendPointInfo
})(App);
