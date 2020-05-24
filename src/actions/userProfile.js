export const USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST';
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';

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
        type: USER_PROFILE_FAILURE
    }
);