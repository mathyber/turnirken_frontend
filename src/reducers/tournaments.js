import {
    TOURNAMENT_CREATE_FAILURE,
    TOURNAMENT_CREATE_REQUEST,
    TOURNAMENT_CREATE_SUCCESS,
    TOURNAMENT_SAVE_GRID_FAILURE,
    TOURNAMENT_SAVE_GRID_REQUEST,
    TOURNAMENT_SAVE_GRID_SUCCESS,
    TOURNAMENTS_ALL_FAILURE,
    TOURNAMENTS_ALL_REQUEST,
    TOURNAMENTS_ALL_SUCCESS
} from "../actions/tournaments";

const initialState = {
    tournaments: [],
    createError: null,
    gridError: null
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case TOURNAMENTS_ALL_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENTS_ALL_SUCCESS:
            return { ...state, ...payload };
        case TOURNAMENTS_ALL_FAILURE:
            return { ...state };

        case TOURNAMENT_CREATE_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENT_CREATE_SUCCESS:
            return { ...state, ...payload, createError: false };
        case TOURNAMENT_CREATE_FAILURE:
            return { ...state, createError: true };

        case TOURNAMENT_SAVE_GRID_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENT_SAVE_GRID_SUCCESS:
            return { ...state, ...payload, gridError: false };
        case TOURNAMENT_SAVE_GRID_FAILURE:
            return { ...state, gridError: true };

        default:
            return state;
    }
}