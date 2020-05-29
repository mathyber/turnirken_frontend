import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman, setAccessToken } from "../utils/postman";
import {TOURNAMENT_CREATE_REQUEST, TOURNAMENTS_ALL_REQUEST} from "../actions/tournaments";

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

function* workerTourCreate({ payload, history }) {
    try {
        yield call(() => postman.post('/tournaments/createTournament', payload));
        // yield console.log(postman.get("identity/userInfo"));
        yield put(actions.tournamentCreateSuccess());
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentCreateFailure(e));
    }
}


export default function* watchToursAll() {
    yield takeLatest(TOURNAMENTS_ALL_REQUEST, workerToursAll)
    yield takeLatest(TOURNAMENT_CREATE_REQUEST, workerTourCreate)
}