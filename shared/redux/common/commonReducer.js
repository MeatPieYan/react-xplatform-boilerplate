/**
 * ------------------------------------------------------------------
 * import * as actions from './commonAction';
 * ...
 *  case actions.SET_UI_STATE:
 * ------------------------------------------------------------------
 */

import * as actions from './commonAction';

const uiState = (state = {}, action) => {
  switch (action.type) {
    case actions.COM_SET_UI_STATE:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
};

export default {
  uiState
};
