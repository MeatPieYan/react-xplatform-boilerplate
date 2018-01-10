export default function (state = { text: [] }, action) {
  switch (action.type) {
    case 'ACTION_SAGA':
      return {
        // ...state,
        text: action.payload.text
      };
    default:
      return state;
  }
}
