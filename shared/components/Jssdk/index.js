import React, { Component as C } from 'react';

import { loadJssdk } from './loadJs';

class Jssdk extends C {
  componentDidMount() {
    // loadJssdk(this.props.onReady);
    loadJssdk(this.props.onReady);
  }

  render() {
    return (
      <div />
    );
  }
}

export default Jssdk;
