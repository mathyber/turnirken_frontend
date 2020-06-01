import { MATCHES_ALL_REQUEST, MATCHES_ALL_SUCCESS, MATCHES_ALL_FAILURE } from "../actions/matches";


const initialState = {
    matchesAll: [],
    grError: false
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case MATCHES_ALL_REQUEST:
            return { ...state, ...payload };
        case MATCHES_ALL_SUCCESS:
            return { ...state, ...payload, grError: false };
        case MATCHES_ALL_FAILURE:
            return { ...state, ...payload, grError: true };
            
        default:
            return state;
    }
}