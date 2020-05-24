export const USER_REG_REQUEST = 'USER_REG_REQUEST';
export const USER_REG_SUCCESS = 'USER_REG_SUCCESS';
export const USER_REG_FAILURE = 'USER_REG_FAILURE';

export const userRegRequest = (payload, history) => ({
    type: USER_REG_REQUEST,
    payload,
    history
});

export const userRegSuccess = () => ({
    type: USER_REG_SUCCESS,
});

export const userRegFailure = payload => ({
    type: USER_REG_FAILURE,
    payload
});