import { combineReducers } from 'redux';
import activityReducer from './activity/activityReducer';
import productReducer from './product/productReducer';
import { env, uiState } from './common/commonReducer';


const reducer = combineReducers({
  activity: activityReducer,
  product: productReducer,
  env,
  uiState
});

export default reducer;

