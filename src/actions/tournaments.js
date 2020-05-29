export const TOURNAMENTS_ALL_REQUEST = 'TOURNAMENTS_ALL_REQUEST';
export const TOURNAMENTS_ALL_SUCCESS = 'TOURNAMENTS_ALL_SUCCESS';
export const TOURNAMENTS_ALL_FAILURE = 'TOURNAMENTS_ALL_FAILURE';

export const TOURNAMENT_CREATE_REQUEST = 'TOURNAMENT_CREATE_REQUEST';
export const TOURNAMENT_CREATE_SUCCESS = 'TOURNAMENT_CREATE_SUCCESS';
export const TOURNAMENT_CREATE_FAILURE = 'TOURNAMENT_CREATE_FAILURE';

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