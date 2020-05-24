import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from "../actions/login";
import JwtHelper from "../utils/jwtHelper";
import {USER_LOGOUT_FAILURE, USER_LOGOUT_SUCCESS} from "../actions/logout";

const initialState = {
    isAuth: JwtHelper.isTokenExist,
    authError: false
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case USER_LOGIN_REQUEST:
            return { ...state };
        case USER_LOGIN_SUCCESS:
            return { ...state, ...payload, isAuth: true, authError: false };
        case USER_LOGIN_FAILURE:
            return { ...state, ...payload, authError: true };
        case USER_LOGOUT_SUCCESS:
            return { ...state, isAuth: false };
        case USER_LOGOUT_FAILURE:
            return { ...state };
        default:
            return state;
    }
}