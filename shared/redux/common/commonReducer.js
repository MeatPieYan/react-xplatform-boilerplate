const env = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ENV':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

const uiState = (state = {}, action) => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return {
        // ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
};

export default {
  env,
  uiState
};
