export const TOURNAMENTS_ALL_REQUEST = 'TOURNAMENTS_ALL_REQUEST';
export const TOURNAMENTS_ALL_SUCCESS = 'TOURNAMENTS_ALL_SUCCESS';
export const TOURNAMENTS_ALL_FAILURE = 'TOURNAMENTS_ALL_FAILURE';

export const TOURNAMENTS_SEARCH_REQUEST = 'TOURNAMENTS_SEARCH_REQUEST';
export const TOURNAMENTS_SEARCH_GAME_REQUEST = 'TOURNAMENTS_SEARCH_GAME_REQUEST';
export const TOURNAMENTS_SEARCH_SUCCESS = 'TOURNAMENTS_SEARCH_SUCCESS';
export const TOURNAMENTS_SEARCH_FAILURE = 'TOURNAMENTS_SEARCH_FAILURE';

export const TOURNAMENT_ID_REQUEST = 'TOURNAMENT_ID_REQUEST';
export const TOURNAMENT_ID_SUCCESS = 'TOURNAMENT_ID_SUCCESS';
export const TOURNAMENT_ID_FAILURE = 'TOURNAMENT_ID_FAILURE';

export const TOURNAMENT_CREATE_REQUEST = 'TOURNAMENT_CREATE_REQUEST';
export const TOURNAMENT_CREATE_SUCCESS = 'TOURNAMENT_CREATE_SUCCESS';
export const TOURNAMENT_CREATE_FAILURE = 'TOURNAMENT_CREATE_FAILURE';

export const TOURNAMENT_REG_REQUEST = 'TOURNAMENT_REG_REQUEST';
export const TOURNAMENT_REG_SUCCESS = 'TOURNAMENT_REG_SUCCESS';
export const TOURNAMENT_REG_FAILURE = 'TOURNAMENT_REG_FAILURE';

export const TOURNAMENT_SAVE_GRID_REQUEST = 'TOURNAMENT_SAVE_GRID_REQUEST';
export const TOURNAMENT_SAVE_GRID_SUCCESS = 'TOURNAMENT_SAVE_GRID_SUCCESS';
export const TOURNAMENT_SAVE_GRID_FAILURE = 'TOURNAMENT_SAVE_GRID_FAILURE';

export const TOURNAMENT_PARTICIPANTS_REQUEST = 'TOURNAMENT_PARTICIPANTS_REQUEST';
export const TOURNAMENT_PARTICIPANTS_SUCCESS = 'TOURNAMENT_PARTICIPANTS_SUCCESS';
export const TOURNAMENT_PARTICIPANTS_FAILURE = 'TOURNAMENT_PARTICIPANTS_FAILURE';


export const tournamentsAllRequest = () => (
    {
        type: TOURNAMENTS_ALL_REQUEST
    }
);

export const tournamentsAllSuccess = (payload) => (
    {
        type: TOURNAMENTS_ALL_SUCCESS,
        payload
    }
);

export const tournamentsAllFailure = () => (
    {
        type: TOURNAMENTS_ALL_FAILURE
    }
);

export const tournamentCreateRequest = (payload, history) => ({
    type: TOURNAMENT_CREATE_REQUEST,
    payload,
    history
});

export const tournamentCreateSuccess = () => ({
    type: TOURNAMENT_CREATE_SUCCESS,
});

export const tournamentCreateFailure = payload => ({
    type: TOURNAMENT_CREATE_FAILURE,
    payload
});


export const tournamentSaveGridRequest = (payload, history) => ({
    type: TOURNAMENT_SAVE_GRID_REQUEST,
    payload,
    history
});

export const tournamentSaveGridSuccess = () => ({
    type: TOURNAMENT_SAVE_GRID_SUCCESS,
});

export const tournamentSaveGridFailure = payload => ({
    type: TOURNAMENT_SAVE_GRID_FAILURE,
    payload
});

export const tournamentIdRequest = (payload, history) => ({
    type: TOURNAMENT_ID_REQUEST,
    payload,
    history
});

export const tournamentIdSuccess = (payload) => ({
    type: TOURNAMENT_ID_SUCCESS,
    payload
});

export const tournamentIdFailure = payload => ({
    type: TOURNAMENT_ID_FAILURE,
    payload
});

export const tournamentRegRequest = (payload, history) => ({
    type: TOURNAMENT_REG_REQUEST,
    payload,
    history
});

export const tournamentRegSuccess = (payload) => ({
    type: TOURNAMENT_REG_SUCCESS,
    payload
});

export const tournamentRegFailure = payload => ({
    type: TOURNAMENT_REG_FAILURE,
    payload
});

export const tournamentPartsRequest = (payload, history) => ({
    type: TOURNAMENT_PARTICIPANTS_REQUEST,
    payload,
    history
});

export const tournamentPartsSuccess = (payload) => ({
    type: TOURNAMENT_PARTICIPANTS_SUCCESS,
    payload
});

export const tournamentPartsFailure = payload => ({
    type: TOURNAMENT_PARTICIPANTS_FAILURE,
    payload
});

export const tournamentSearchRequest = (payload, history) => ({
    type: TOURNAMENTS_SEARCH_REQUEST,
    payload,
    history
});

export const tournamentSearchGameRequest = (payload, history) => ({
    type: TOURNAMENTS_SEARCH_GAME_REQUEST,
    payload,
    history
});

export const tournamentSearchSuccess = (payload) => ({
    type: TOURNAMENTS_SEARCH_SUCCESS,
    payload
});

export const tournamentSearchFailure = payload => ({
    type: TOURNAMENTS_SEARCH_FAILURE,
    payload
});