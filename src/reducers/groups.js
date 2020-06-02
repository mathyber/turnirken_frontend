import {
    GROUPS_ALL_REQUEST,
    GROUPS_ALL_SUCCESS,
    GROUPS_ALL_FAILURE,
    GROUPS_SAVE_REQUEST,
    GROUPS_SAVE_SUCCESS, GROUPS_SAVE_FAILURE
} from "../actions/groups";


const initialState = {
    groupsAll: [],
    grError: false
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GROUPS_ALL_REQUEST:
            return { ...state, ...payload };
        case GROUPS_ALL_SUCCESS:
            return { ...state, ...payload, grError: false };
        case GROUPS_ALL_FAILURE:
            return { ...state, ...payload, grError: true };

        case GROUPS_SAVE_REQUEST:
            return { ...state, ...payload };
        case GROUPS_SAVE_SUCCESS:
            return { ...state, ...payload, grError: false };
        case GROUPS_SAVE_FAILURE:
            return { ...state, ...payload, grError: true };

        default:
            return state;
    }
}