export default function (state = { text: [] }, action) {
  switch (action.type) {
    case 'ACTION_SAGA_PROD_A':
      return {
        // ...state,
        text: action.payload.text
      };
    default:
      return state;
  }
}

