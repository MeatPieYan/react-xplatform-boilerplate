import { combineReducers } from 'redux';
import productA from '../../pages/product/productA/reducer';

const activityReducer = combineReducers({
  productA
});

export default activityReducer;
