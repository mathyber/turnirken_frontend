export const MATCHES_ALL_REQUEST = 'MATCHES_ALL_REQUEST';
export const MATCHES_ALL_SUCCESS = 'MATCHES_ALL_SUCCESS';
export const MATCHES_ALL_FAILURE = 'MATCHES_ALL_FAILURE';

export const MATCHES_REQUEST = 'MATCHES_REQUEST';
export const MATCHES_SUCCESS = 'MATCHES_SUCCESS';
export const MATCHES_FAILURE = 'MATCHES_FAILURE';

export const MATCH_REQUEST = 'MATCH_REQUEST';
export const MATCH_SUCCESS = 'MATCH_SUCCESS';
export const MATCH_FAILURE = 'MATCH_FAILURE';

export const SET_RESULT_MATCH_REQUEST = 'SET_RESULT_MATCH_REQUEST';
export const SET_RESULT_MATCH_SUCCESS = 'SET_RESULT_MATCH_SUCCESS';
export const SET_RESULT_MATCH_FAILURE = 'SET_RESULT_MATCH_FAILURE';

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

export const matchesRequest = (payload, history) => ({
    type: MATCHES_REQUEST,
    payload,
    history
});

export const matchesSuccess = (payload) => ({
    type: MATCHES_SUCCESS,
    payload
});

export const matchesFailure = payload => ({
    type: MATCHES_FAILURE,
    payload
});

export const matchRequest = (payload, history) => ({
    type: MATCH_REQUEST,
    payload,
    history
});

export const matchSuccess = (payload) => ({
    type: MATCH_SUCCESS,
    payload
});

export const matchFailure = payload => ({
    type: MATCH_FAILURE,
    payload
});

export const setMatchResultRequest = (payload, history) => ({
    type: SET_RESULT_MATCH_REQUEST,
    payload,
    history
});

export const setMatchResultSuccess = (payload) => ({
    type: SET_RESULT_MATCH_SUCCESS,
    payload
});

export const setMatchResultFailure = payload => ({
    type: SET_RESULT_MATCH_FAILURE,
    payload
});
