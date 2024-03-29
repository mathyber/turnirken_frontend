import {
    MATCHES_ALL_REQUEST,
    MATCHES_ALL_SUCCESS,
    MATCHES_ALL_FAILURE,
    MATCHES_FAILURE,
    MATCHES_SUCCESS,
    MATCHES_REQUEST,
    MATCH_REQUEST,
    MATCH_SUCCESS,
    MATCH_FAILURE,
    SET_RESULT_MATCH_REQUEST,
    SET_RESULT_MATCH_SUCCESS,
    SET_RESULT_MATCH_FAILURE,
    MATCHES_GROUP_REQUEST,
    MATCHES_GROUP_SUCCESS,
    MATCHES_GROUP_FAILURE
} from "../actions/matches";


const initialState = {
    matchesAll: [],
    grError: false,
    mError: null,
    matchesTour: [],
    matchesGroup: [],
    matchT: {},
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case MATCHES_ALL_REQUEST:
            return { ...state, ...payload };
        case MATCHES_ALL_SUCCESS:
            return { ...state, ...payload, grError: false };
        case MATCHES_ALL_FAILURE:
            return { ...state, ...payload, grError: true };

        case MATCHES_REQUEST:
            return { ...state, ...payload };
        case MATCHES_SUCCESS:
            return { ...state, ...payload, grError: false };
        case MATCHES_FAILURE:
            return { ...state, ...payload, grError: true };

        case MATCHES_GROUP_REQUEST:
            return { ...state, ...payload };
        case MATCHES_GROUP_SUCCESS:
            return { ...state, ...payload, grError: false };
        case MATCHES_GROUP_FAILURE:
            return { ...state, ...payload, grError: true };

        case MATCH_REQUEST:
            return { ...state, ...payload };
        case MATCH_SUCCESS:
            return { ...state, ...payload, grError: false };
        case MATCH_FAILURE:
            return { ...state, ...payload, grError: true };


        case SET_RESULT_MATCH_REQUEST:
            return { ...state, ...payload };
        case SET_RESULT_MATCH_SUCCESS:
            return { ...state, ...payload, mError: false };
        case SET_RESULT_MATCH_FAILURE:
            return { ...state, ...payload, mError: true };

        default:
            return state;
    }
}