import { combineReducers } from 'redux';
import userReducer from './userReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  userReducer,
  uiReducer
});