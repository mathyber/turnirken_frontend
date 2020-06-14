export const USER_REG_REQUEST = 'USER_REG_REQUEST';
export const USER_REG_SUCCESS = 'USER_REG_SUCCESS';
export const USER_REG_FAILURE = 'USER_REG_FAILURE';

export const SET_ROLE_REQUEST = 'SET_ROLE_REQUEST';
export const SET_ROLE_SUCCESS = 'SET_ROLE_SUCCESS';
export const SET_ROLE_FAILURE = 'SET_ROLE_FAILURE';

export const USER_TEST_EMAIL_REQUEST = 'USER_TEST_EMAIL_REQUEST';
export const USER_TEST_EMAIL_TRUE = 'USER_TEST_EMAIL_TRUE';
export const USER_TEST_EMAIL_FALSE = 'USER_TEST_EMAIL_FALSE';

export const USER_TEST_LOGIN_REQUEST = 'USER_TEST_LOGIN_REQUEST';
export const USER_TEST_LOGIN_TRUE = 'USER_TEST_LOGIN_TRUE';
export const USER_TEST_LOGIN_FALSE = 'USER_TEST_LOGIN_FALSE';


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


export const setRoleRequest = (payload) => ({
    type: SET_ROLE_REQUEST,
    payload
});

export const setRoleSuccess = () => ({
    type: SET_ROLE_SUCCESS,
});

export const setRoleFailure = payload => ({
    type: SET_ROLE_FAILURE,
    payload
});


export const userTestEmailRequest = (payload) => ({
    type: USER_TEST_EMAIL_REQUEST,
    payload,
    history
});

export const userTestEmailSuccess = () => ({
    type: USER_TEST_EMAIL_TRUE,
});

export const userTestEmailFailure = payload => ({
    type: USER_TEST_EMAIL_FALSE,
    payload
});



export const userTestLoginRequest = (payload) => ({
    type: USER_TEST_LOGIN_REQUEST,
    payload,
    history
});

export const userTestLoginSuccess = () => ({
    type: USER_TEST_LOGIN_TRUE,
});

export const userTestLoginFailure = payload => ({
    type: USER_TEST_LOGIN_FALSE,
    payload
});