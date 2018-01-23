import * as actions from './action';

export default function (state = { text: [] }, action) {
  switch (action.type) {
    case actions.COM_SAGA:
      return {
        ...state,
        text: action.payload.test
      };
    default:
      return state;
  }
}
