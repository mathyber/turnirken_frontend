import {
    TOURNAMENT_CREATE_FAILURE,
    TOURNAMENT_CREATE_REQUEST,
    TOURNAMENT_CREATE_SUCCESS, TOURNAMENT_DELETE_FAILURE, TOURNAMENT_DELETE_REQUEST, TOURNAMENT_DELETE_SUCCESS,
    TOURNAMENT_ID_FAILURE,
    TOURNAMENT_ID_REQUEST,
    TOURNAMENT_ID_SUCCESS,
    TOURNAMENT_PARTICIPANT_DELETE_FAILURE,
    TOURNAMENT_PARTICIPANT_DELETE_REQUEST,
    TOURNAMENT_PARTICIPANT_DELETE_SUCCESS,
    TOURNAMENT_PARTICIPANTS_FAILURE,
    TOURNAMENT_PARTICIPANTS_REQUEST,
    TOURNAMENT_PARTICIPANTS_SUCCESS,
    TOURNAMENT_REG_FAILURE,
    TOURNAMENT_REG_REQUEST,
    TOURNAMENT_REG_SUCCESS,
    TOURNAMENT_SAVE_GRID_FAILURE,
    TOURNAMENT_SAVE_GRID_REQUEST,
    TOURNAMENT_SAVE_GRID_SUCCESS,
    TOURNAMENTS_ALL_FAILURE,
    TOURNAMENTS_ALL_REQUEST,
    TOURNAMENTS_ALL_SUCCESS,
    TOURNAMENTS_SEARCH_FAILURE,
    TOURNAMENTS_SEARCH_REQUEST,
    TOURNAMENTS_SEARCH_SUCCESS
} from "../actions/tournaments";

const initialState = {
    tournaments: [],
    participants: [],
    tournament: null,
    createError: null,
    gridError: null,
    regError: null,
    pError: null,
    delPartError: null,
    delError: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case TOURNAMENTS_ALL_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENTS_ALL_SUCCESS:
            return { ...state, ...payload };
        case TOURNAMENTS_ALL_FAILURE:
            return { ...state };

        case TOURNAMENTS_SEARCH_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENTS_SEARCH_SUCCESS:
            return { ...state, ...payload };
        case TOURNAMENTS_SEARCH_FAILURE:
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

        case TOURNAMENT_PARTICIPANTS_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENT_PARTICIPANTS_SUCCESS:
            return { ...state, ...payload, pError: false };
        case TOURNAMENT_PARTICIPANTS_FAILURE:
            return { ...state, pError: true };


        case TOURNAMENT_PARTICIPANT_DELETE_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENT_PARTICIPANT_DELETE_SUCCESS:
            return { ...state, ...payload, delPartError: false };
        case TOURNAMENT_PARTICIPANT_DELETE_FAILURE:
            return { ...state, delPartError: true };

        case TOURNAMENT_DELETE_REQUEST:
            return { ...state, ...payload };
        case TOURNAMENT_DELETE_SUCCESS:
            return { ...state, ...payload, delError: false };
        case TOURNAMENT_DELETE_FAILURE:
            return { ...state, delError: true };

        default:
            return state;
    }
}