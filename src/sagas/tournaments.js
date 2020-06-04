import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman, setAccessToken } from "../utils/postman";
import {
    TOURNAMENT_CREATE_REQUEST,
    TOURNAMENT_ID_REQUEST, TOURNAMENT_PARTICIPANTS_REQUEST, TOURNAMENT_REG_REQUEST,
    TOURNAMENT_SAVE_GRID_REQUEST,
    TOURNAMENTS_ALL_REQUEST, TOURNAMENTS_SEARCH_GAME_REQUEST, TOURNAMENTS_SEARCH_REQUEST
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

function* workerToursSearch({payload}) {
    try {
        yield setAccessToken(JwtHelper.token);
        const tours = yield call(() => postman.post("/tournaments/searchTournaments", payload ));
      //  const tours1 = yield call(() => postman.post("/tournaments/searchTournamentsNameGame", payload ));
      //  console.log(tours);
        yield put(actions.tournamentSearchSuccess({ tournaments: tours }));
      //  yield put(actions.tournamentSearchSuccess({ tournaments: tours1 }));
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentSearchFailure(e));
    }
}

function* workerToursSearchGame({payload}) {
    try {
        yield setAccessToken(JwtHelper.token);
       // const tours = yield call(() => postman.post("/tournaments/searchTournaments", payload ));
          const tours = yield call(() => postman.post("/tournaments/searchTournamentsNameGame", payload ));
        //  console.log(tours);
        yield put(actions.tournamentSearchSuccess({ tournaments: tours }));
        //  yield put(actions.tournamentSearchSuccess({ tournaments: tours1 }));
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentSearchFailure(e));
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
        yield history.push("/tournament_organizer/"+id);
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

function* workerTourReg({ payload, history }) {
    try {
        yield call(() => postman.post('/tournaments/goParticipate', payload));

        yield put(actions.tournamentRegSuccess());
        //  yield history.push("/tournament_settings/"+id);
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentRegFailure(e));
    }
}


function* workerTourParticipants({ payload }) {
    try {
        yield setAccessToken(JwtHelper.token);
        const participants = yield call(() => postman.post("/tournaments/getParticipants",{id: payload} ));
        console.log(participants);
        yield put(actions.tournamentPartsSuccess({ participants: participants }));
    } catch (e) {
        console.log(e);
        yield put(actions.tournamentPartsFailure(e));
    }
}


export default function* watchToursAll() {
    yield takeLatest(TOURNAMENTS_ALL_REQUEST, workerToursAll)
    yield takeLatest(TOURNAMENTS_SEARCH_REQUEST, workerToursSearch)
    yield takeLatest(TOURNAMENTS_SEARCH_GAME_REQUEST, workerToursSearchGame)
    yield takeLatest(TOURNAMENT_CREATE_REQUEST, workerTourCreate)
    yield takeLatest(TOURNAMENT_SAVE_GRID_REQUEST, workerTourGrid)
    yield takeLatest(TOURNAMENT_ID_REQUEST, workerTourId)
    yield takeLatest(TOURNAMENT_REG_REQUEST, workerTourReg)
    yield takeLatest(TOURNAMENT_PARTICIPANTS_REQUEST, workerTourParticipants)

}