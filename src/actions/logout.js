export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const userLogoutSuccess = history => ({
    type: USER_LOGOUT_SUCCESS,
    history
});

export const userLogoutFailure = payload => ({
    type: USER_LOGOUT_FAILURE,
    payload
});