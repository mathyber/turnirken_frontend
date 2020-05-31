import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman, setAccessToken } from "../utils/postman";
import {
    TOURNAMENT_CREATE_REQUEST,
    TOURNAMENT_ID_REQUEST,
    TOURNAMENT_SAVE_GRID_REQUEST,
    TOURNAMENTS_ALL_REQUEST
} from "../actions/tournaments";
import {TOURNAMENT_SETTINGS_LINK} from "../routes/link";

function* workerToursAll() {
    try {
        yield setAccessToken(JwtHelper.token);
        const tours = yield call(() => postman.get("/tournaments/getTournaments" ));
        console.log(tours);
        yield put(actions.tournamentsAllSuccess({ tournaments: tours }));
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentsAllFailure(e));
    }
}

function* workerTourId({ payload }) {
    try {
        yield setAccessToken(JwtHelper.token);
        const tour = yield call(() => postman.post("/tournaments/getTournamentId",{id: payload} ));
        console.log(tour);
        yield put(actions.tournamentIdSuccess({ tournament: tour }));
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentIdFailure(e));
    }
}

function* workerTourCreate({ payload, history }) {
    try {
        let {id} = yield call(() => postman.post('/tournaments/createTournament', payload));
      //  yield console.log(tour);
        yield put(actions.tournamentCreateSuccess());
        yield history.push("/tournament_settings/"+id);
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentCreateFailure(e));
    }
}

function* workerTourGrid({ payload, history }) {
    try {
        yield call(() => postman.post('/tournaments/saveTournamentGrid', payload));
        //  yield console.log(tour);
        yield put(actions.tournamentSaveGridSuccess());
      //  yield history.push("/tournament_settings/"+id);
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentSaveGridFailure(e));
    }
}


export default function* watchToursAll() {
    yield takeLatest(TOURNAMENTS_ALL_REQUEST, workerToursAll)
    yield takeLatest(TOURNAMENT_CREATE_REQUEST, workerTourCreate)
    yield takeLatest(TOURNAMENT_SAVE_GRID_REQUEST, workerTourGrid)
    yield takeLatest(TOURNAMENT_ID_REQUEST, workerTourId)
}