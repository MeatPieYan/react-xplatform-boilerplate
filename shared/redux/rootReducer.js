import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import activityReducer from './activity/activityReducer';
import productReducer from './product/productReducer';
import { env, uiState } from './common/commonReducer';

const reducer = combineReducers({
  activity: activityReducer,
  product: productReducer,
  form: formReducer,
  env,
  uiState
});

export default reducer;

