export const USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST';
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

export const NEW_PASS_REQUEST = 'NEW_PASS_REQUEST';
export const NEW_PASS_SUCCESS = 'NEW_PASS_SUCCESS';
export const NEW_PASS_FAILURE = 'NEW_PASS_FAILURE';

export const NEW_EMAIL_REQUEST = 'NEW_EMAIL_REQUEST';
export const NEW_EMAIL_SUCCESS = 'NEW_EMAIL_SUCCESS';
export const NEW_EMAIL_FAILURE = 'NEW_EMAIL_FAILURE';

export const userProfileRequest = () => (
    {
        type: USER_PROFILE_REQUEST
    }
);

export const userProfileSuccess = (payload) => (
    {
        type: USER_PROFILE_SUCCESS,
        payload
    }
);

export const userProfileFailure = () => (
    {
        type:  USER_PROFILE_FAILURE
    }
);


export const profileRequest = (payload) => (
    {
        type:  PROFILE_REQUEST,
        payload
    }
);

export const profileSuccess = (payload) => (
    {
        type:  PROFILE_SUCCESS,
        payload
    }
);

export const profileFailure = () => (
    {
        type:  PROFILE_FAILURE
    }
);


export const newPassRequest = (payload) => (
    {
        type:  NEW_PASS_REQUEST,
        payload
    }
);

export const newPassSuccess = (payload) => (
    {
        type:  NEW_PASS_SUCCESS,
        payload
    }
);

export const newPassFailure = () => (
    {
        type:  NEW_PASS_FAILURE
    }
);


export const newEmailRequest = (payload) => (
    {
        type:  NEW_EMAIL_REQUEST,
        payload
    }
);

export const newEmailSuccess = (payload) => (
    {
        type:  NEW_EMAIL_SUCCESS,
        payload
    }
);

export const newEmailFailure = () => (
    {
        type:  NEW_EMAIL_FAILURE
    }
);