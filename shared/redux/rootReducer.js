import { combineReducers } from 'redux';
import { pieReducer } from 'za-piehelper';

import { reducer as formReducer } from 'redux-form';
import activityReducer from './activity/activityReducer';
import productReducer from './product/productReducer';
import { uiState } from './common/commonReducer';

const reducer = combineReducers({
  activity: activityReducer,
  product: productReducer,
  form: formReducer,
  ...pieReducer,
  uiState
});

export default reducer;

