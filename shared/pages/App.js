import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { pieConnect } from 'za-piehelper';

import { getXPath } from '../utils/utils';
import { Loading, MessageModal } from '../components';
import { sendPointInfo, loadNodeEnv, resetMessage } from '../redux/common/commonAction';

class App extends React.PureComponent {
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
      message,
      route,
      resetMessage
    } = this.props;
    return (
      <div onClick={this.onAnywhereClick}>
        <Loading isShow={showLoading} />
        <MessageModal text={message} onPress={resetMessage} />

        {/* child routes won't render without this */}
        <div>
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  showLoading: false,
  message: [],
  loadNodeEnv: () => {},
  sendPointInfo: () => {},
  resetMessage: () => {}
}

App.propTypes = {
  route: PropTypes.object.isRequired,
  showLoading: PropTypes.bool,
  message: PropTypes.arrayOf(PropTypes.string),
  loadNodeEnv: PropTypes.func,
  sendPointInfo: PropTypes.func,
  resetMessage: PropTypes.func
};

export default pieConnect(
  state => ({
    showLoading: !!state.uiState.showLoading,
    message: state.message
  }), {
    sendPointInfo,
    loadNodeEnv,
    resetMessage
  }
)(App);
