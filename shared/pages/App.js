import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { pieConnect } from 'za-piehelper';

import { getXPath } from '../utils/utils';
import Log from '../utils/log';
import { Loading, MessageModal } from '../components';
import { sendPointInfo, loadNodeEnv, resetMessage } from '../redux/common/commonAction';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onAnywhereClick = this.onAnywhereClick.bind(this);
    this.fristMount = true;
  }

  componentDidMount() {
    this.props.loadNodeEnv();
  }


  componentWillUpdate(nextProps) {
    const { clientInfo, env } = nextProps;
    if (clientInfo && env && this.fristMount) {
      this.fristMount = false;
      new Log(env, clientInfo);
    }
  }

  onAnywhereClick(e) {
    this.props.sendPointInfo(getXPath(e.target));
  }

  render() {
    const {
      showLoading,
      message,
      route,
      resetMessage: resetFn
    } = this.props;
    return (
      <div onClick={this.onAnywhereClick}>
        <Loading isShow={showLoading} />
        <MessageModal text={message} onPress={resetFn} />

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
  resetMessage: () => {},
  env: ''
};

App.propTypes = {
  route: PropTypes.object.isRequired,
  showLoading: PropTypes.bool,
  message: PropTypes.arrayOf(PropTypes.string),
  loadNodeEnv: PropTypes.func,
  sendPointInfo: PropTypes.func,
  resetMessage: PropTypes.func,
  clientInfo: PropTypes.object.isRequired,
  env: PropTypes.string
};

export default pieConnect(
  state => ({
    showLoading: !!state.uiState.showLoading,
    message: state.message,
    clientInfo: state.env,
    env: state.node.env
  }), {
    sendPointInfo,
    loadNodeEnv,
    resetMessage
  }
)(App);
