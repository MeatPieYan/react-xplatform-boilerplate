/**
 * ------------------------------------------------------------------
 * import * as actions from './commonAction';
 * ...
 *  case actions.SET_UI_STATE:
 * ------------------------------------------------------------------
 */

import { COM_LOAD_NODE_ENV, COM_SET_UI_STATE, COM_SET_MESSAGE, COM_RESET_MESSAGE } from './commonAction';

const message = (state = [], action) => {
  // debugger;
  switch (action.type) {
    case COM_SET_MESSAGE:
      return action.payload.message;
    case COM_RESET_MESSAGE:
      return [];
    default:
      return state;
  }
};

const uiState = (state = {}, action) => {
  switch (action.type) {
    case COM_SET_UI_STATE:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
};

const node = (state = { env: '' }, action) => {
  switch (action.type) {
    case COM_LOAD_NODE_ENV.SUCCESS:
      return {
        ...state,
        env: action.payload
      };
    default:
      return state;
  }
}

export default {
  uiState,
  node,
  message
};
