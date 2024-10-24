// src/redux/reducers/authReducer.js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../constants/authConstants';

const initialState = {
    loading: false,
    user: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Chỉ lưu thông tin lỗi
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default authReducer;
