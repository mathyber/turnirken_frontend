import {
    TOURNAMENT_CREATE_FAILURE,
    TOURNAMENT_CREATE_REQUEST,
    TOURNAMENT_CREATE_SUCCESS,
    TOURNAMENT_ID_FAILURE,
    TOURNAMENT_ID_REQUEST,
    TOURNAMENT_ID_SUCCESS, TOURNAMENT_REG_FAILURE,
    TOURNAMENT_REG_REQUEST, TOURNAMENT_REG_SUCCESS,
    TOURNAMENT_SAVE_GRID_FAILURE,
    TOURNAMENT_SAVE_GRID_REQUEST,
    TOURNAMENT_SAVE_GRID_SUCCESS,
    TOURNAMENTS_ALL_FAILURE,
    TOURNAMENTS_ALL_REQUEST,
    TOURNAMENTS_ALL_SUCCESS
} from "../actions/tournaments";

const initialState = {
    tournaments: [],
    tournament: null,
    createError: null,
    gridError: null,
    regError: null
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case TOURNAMENTS_ALL_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENTS_ALL_SUCCESS:
            return { ...state, ...payload };
        case TOURNAMENTS_ALL_FAILURE:
            return { ...state };

        case TOURNAMENT_ID_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENT_ID_SUCCESS:
            return { ...state, ...payload };
        case TOURNAMENT_ID_FAILURE:
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

        case TOURNAMENT_REG_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENT_REG_SUCCESS:
            return { ...state, ...payload, regError: false };
        case TOURNAMENT_REG_FAILURE:
            return { ...state, regError: true };

        default:
            return state;
    }
}