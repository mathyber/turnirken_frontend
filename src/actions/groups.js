export const GROUPS_ALL_REQUEST = 'GROUPS_ALL_REQUEST';
export const GROUPS_ALL_SUCCESS = 'GROUPS_ALL_SUCCESS';
export const GROUPS_ALL_FAILURE = 'GROUPS_ALL_FAILURE';

export const GROUPS_SAVE_REQUEST = 'GROUPS_SAVE_REQUEST';
export const GROUPS_SAVE_SUCCESS = 'GROUPS_SAVE_SUCCESS';
export const GROUPS_SAVE_FAILURE = 'GROUPS_SAVE_FAILURE';

export const GROUPS_REQUEST = 'GROUPS_REQUEST';
export const GROUPS_SUCCESS = 'GROUPS_SUCCESS';
export const GROUPS_FAILURE = 'GROUPS_FAILURE';

export const GROUP_REQUEST = 'GROUP_REQUEST';
export const GROUP_SUCCESS = 'GROUP_SUCCESS';
export const GROUP_FAILURE = 'GROUP_FAILURE';

export const groupsAllRequest = (payload, history) => ({
    type: GROUPS_ALL_REQUEST,
    payload,
    history
});

export const groupsAllSuccess = (payload) => ({
    type: GROUPS_ALL_SUCCESS,
    payload
});

export const groupsAllFailure = payload => ({
    type: GROUPS_ALL_FAILURE,
    payload
});

export const groupsSaveRequest = (payload, history) => ({
    type: GROUPS_SAVE_REQUEST,
    payload,
    history
});

export const groupsSaveSuccess = (payload) => ({
    type: GROUPS_SAVE_SUCCESS,
    payload
});

export const groupsSaveFailure = payload => ({
    type: GROUPS_SAVE_FAILURE,
    payload
});

export const groupsRequest = (payload, history) => ({
    type: GROUPS_REQUEST,
    payload,
    history
});

export const groupsSuccess = (payload) => ({
    type: GROUPS_SUCCESS,
    payload
});

export const groupsFailure = payload => ({
    type: GROUPS_FAILURE,
    payload
});

export const groupRequest = (payload, history) => ({
    type: GROUP_REQUEST,
    payload,
    history
});

export const groupSuccess = (payload) => ({
    type: GROUP_SUCCESS,
    payload
});

export const groupFailure = payload => ({
    type: GROUP_FAILURE,
    payload
});