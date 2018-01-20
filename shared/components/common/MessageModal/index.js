import React from 'react';
import { func, array } from 'prop-types';

import * as style from './style.scss';

class MessageModal extends React.Component {
  constructor() {
    super();

    this.press = this.press.bind(this);
  }

  componentDidUpdate() {
    if (this.props.text.length && this.props.text.length > 0) {
      this.timeout = setTimeout(this.press, 3000);
    }
  }

  press() {
    this.props.onPress();
    clearTimeout(this.timeout);
  }

  render() {
    let { text } = this.props;

    if (Array.isArray(text)) {
      text = text.map((t) => {
        if (t.startsWith('Error: Response timeout')) return '系统异常，请重试';
        return t;
      });
    }

    return (
      <div onClick={this.press} className={this.props.text.length > 0 ? style.display : style.hidden}>
        <div className={style.innerContainer}>
          <ul>
            {
              text.map((t, i) => (
                <li key={i}>{t}</li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

MessageModal.defaultProps = {
  onPress: () => {},
  text: []
};

MessageModal.propTypes = {
  onPress: func,
  text: array
};

export default MessageModal;
