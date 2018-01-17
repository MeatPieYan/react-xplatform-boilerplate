import { combineReducers } from 'redux';
import activityA from '../../pages/activity/activityA/reducer';
import test from '../../pages/test.1/reducer';

const activityReducer = combineReducers({
  activityA,
  test
});

export default activityReducer;
