export const MATCHES_ALL_REQUEST = 'MATCHES_ALL_REQUEST';
export const MATCHES_ALL_SUCCESS = 'MATCHES_ALL_SUCCESS';
export const MATCHES_ALL_FAILURE = 'MATCHES_ALL_FAILURE';

export const matchesAllRequest = (payload, history) => ({
    type: MATCHES_ALL_REQUEST,
    payload,
    history
});

export const matchesAllSuccess = (payload) => ({
    type: MATCHES_ALL_SUCCESS,
    payload
});

export const matchesAllFailure = payload => ({
    type: MATCHES_ALL_FAILURE,
    payload
});