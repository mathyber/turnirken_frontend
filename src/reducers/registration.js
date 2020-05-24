import {
    USER_REG_FAILURE,
    USER_REG_REQUEST,
    USER_REG_SUCCESS, USER_TEST_EMAIL_FALSE,
    USER_TEST_EMAIL_REQUEST,
    USER_TEST_EMAIL_TRUE, USER_TEST_LOGIN_FALSE, USER_TEST_LOGIN_REQUEST, USER_TEST_LOGIN_TRUE
} from "../actions/registration";

const initialState = {
    regError: null,
    testLogin: null,
    testEmail: null
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case USER_REG_REQUEST:
            return { ...state };
        case USER_REG_SUCCESS:
            return { ...state, ...payload, regError: false };
        case USER_REG_FAILURE:
            return { ...state, ...payload, regError: true };
        case USER_TEST_EMAIL_REQUEST:
            return { ...state };
        case USER_TEST_EMAIL_TRUE:
            return { ...state, ...payload, testEmail: true };
        case USER_TEST_EMAIL_FALSE:
            return { ...state, ...payload, testEmail: false };
        case USER_TEST_LOGIN_REQUEST:
            return { ...state };
        case USER_TEST_LOGIN_TRUE:
            return { ...state, ...payload, testLogin: true };
        case USER_TEST_LOGIN_FALSE:
            return { ...state, ...payload, testLogin: false };
        default:
            return state;
    }
}