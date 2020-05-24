import {USER_PROFILE_FAILURE, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS} from "../actions/userProfile";

const initialState = {
    userProfile: {},
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case USER_PROFILE_REQUEST:
            return { ...state, ...payload };
        case USER_PROFILE_SUCCESS:
            return { ...state, ...payload };
        case USER_PROFILE_FAILURE:
            return { ...state };
        default:
            return state;
    }
}