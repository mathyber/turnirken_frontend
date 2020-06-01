import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman } from "../utils/postman";

import {MATCHES_ALL_REQUEST} from "../actions/matches";

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


export default function* watchReg() {
    yield takeLatest(MATCHES_ALL_REQUEST, workerMatchAll);
}
