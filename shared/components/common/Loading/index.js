import React from 'react';
import PropTypes from 'prop-types';

import * as style from './index.scss';

const Loading = (props) => {
  const { isShow } = props;
  return (
    <div className={isShow ? style.show : style.hide} >
      <div className={style.loading} >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

Loading.defaultProps = {
  isShow: false
};

Loading.propTypes = {
  isShow: PropTypes.bool
};

export default Loading;
