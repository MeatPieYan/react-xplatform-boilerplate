import { COM_LOAD_NODE_ENV } from './commonAction';

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
  node
};
