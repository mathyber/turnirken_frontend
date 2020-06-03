import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman } from "../utils/postman";

import {MATCH_REQUEST, MATCHES_ALL_REQUEST, MATCHES_REQUEST, SET_RESULT_MATCH_REQUEST} from "../actions/matches";

function* workerMatchAll({ payload, history }) {
    try {
        let m = yield call(() => postman.post('/tournaments/getMatches', {id:payload}));
       yield console.log(m);
        yield put(actions.matchesAllSuccess({matchesAll: m}));
    } catch (e) {
        console.log(e);
        yield put(actions.matchesAllFailure(e));
    }
}


function* workerMatch({ payload, history }) {
    try {
        let m = yield call(() => postman.post('/matches/getMatchById', {id:payload}));
        yield console.log(m);
        yield put(actions.matchSuccess({matchT: m}));
    } catch (e) {
        console.log(e);
        yield put(actions.matchFailure(e));
    }
}


function* workerMatches({ payload, history }) {
    try {
        let m = yield call(() => postman.post('/matches/getAllMatchesTournament', {id:payload}));
        yield console.log(m);
        yield put(actions.matchesSuccess({matchesTour: m}));
    } catch (e) {
        console.log(e);
        yield put(actions.matchesFailure(e));
    }
}


function* workerSetMatchResult({ payload, history }) {
    try {
        yield call(() => postman.post('/matches/setResult', payload));
        yield put(actions.setMatchResultSuccess());
    } catch (e) {
        console.log(e);
        yield put(actions.setMatchResultFailure(e));
    }
}


export default function* watchReg() {
    yield takeLatest(MATCHES_ALL_REQUEST, workerMatchAll);
    yield takeLatest(MATCHES_REQUEST, workerMatches);
    yield takeLatest(MATCH_REQUEST, workerMatch);
    yield takeLatest(SET_RESULT_MATCH_REQUEST, workerSetMatchResult);
}
