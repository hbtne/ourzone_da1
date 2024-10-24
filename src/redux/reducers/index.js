// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';  // Nhập reducer bạn vừa tạo

const rootReducer = combineReducers({
  auth: authReducer,  // Thêm reducer auth
});

export default rootReducer;
