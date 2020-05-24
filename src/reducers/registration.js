import {USER_REG_FAILURE, USER_REG_REQUEST, USER_REG_SUCCESS} from "../actions/registration";

const initialState = {
    regError: null
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case USER_REG_REQUEST:
            return { ...state };
        case USER_REG_SUCCESS:
            return { ...state, ...payload, regError: false };
        case USER_REG_FAILURE:
            return { ...state, ...payload, regError: true };
        default:
            return state;
    }
}