import {
    NEW_EMAIL_FAILURE,
    NEW_EMAIL_REQUEST, NEW_EMAIL_SUCCESS,
    NEW_PASS_FAILURE,
    NEW_PASS_REQUEST, NEW_PASS_SUCCESS,
    PROFILE_FAILURE,
    PROFILE_REQUEST, PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS
} from "../actions/userProfile";

const initialState = {
    userProfile: {},
    fullUserProfile: {},
    emailError: null,
    passError: null
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case USER_PROFILE_REQUEST:
            return { ...state, ...payload };
        case USER_PROFILE_SUCCESS:
            return { ...state, ...payload };
        case USER_PROFILE_FAILURE:
            return { ...state };

        case PROFILE_REQUEST:
            return { ...state, ...payload };
        case PROFILE_SUCCESS:
            return { ...state, ...payload };
        case PROFILE_FAILURE:
            return { ...state };

        case NEW_PASS_REQUEST:
            return { ...state, ...payload };
        case NEW_PASS_SUCCESS:
            return { ...state, ...payload, passError: false };
        case NEW_PASS_FAILURE:
            return { ...state, passError: true };

        case NEW_EMAIL_REQUEST:
            return { ...state, ...payload };
        case NEW_EMAIL_SUCCESS:
            return { ...state, ...payload, emailError: false };
        case NEW_EMAIL_FAILURE:
            return { ...state,  emailError: true  };

        default:
            return state;
    }
}