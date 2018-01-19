
import React from 'react';
import PropTypes from 'prop-types';
import { PieComponent, pieConnect } from 'za-piehelper';

import { comHideError } from '../../../redux/common/commonAction';
import * as style from './index.scss';

class Error extends PieComponent {
  componentWillUpdate(nextProps) {
    this.hideError(nextProps.showError);
  }

  hideError(showError) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = showError && setTimeout(() => {
      this.props.comHideError();
    }, 3000);
  }

  render() {
    const { errorMsg, showError } = this.props;
    return (
      <div className={showError ? style.show : style.hide} >
        <div className={style.error} >
          {errorMsg}
        </div>
      </div>
    );
  }
}

Error.defaultProps = {
  showError: false
};

Error.prototype = {
  showError: PropTypes.bool
};

export default pieConnect(null,
  {
    comHideError
  }
)(Error);

