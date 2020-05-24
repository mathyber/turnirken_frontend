export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const userLoginRequest = (payload, history) => ({
    type: USER_LOGIN_REQUEST,
    payload,
    history
});

export const userLoginSuccess = () => ({
    type: USER_LOGIN_SUCCESS,
});

export const userLoginFailure = payload => ({
    type: USER_LOGIN_FAILURE,
    payload
});