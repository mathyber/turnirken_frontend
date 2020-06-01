import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman } from "../utils/postman";

import {GROUPS_ALL_REQUEST} from "../actions/groups";

function* workerGroupAll({ payload, history }) {
    try {
        let groups = yield call(() => postman.post('/tournaments/getGroups', {id:payload}));
       yield console.log(groups);
        yield put(actions.groupsAllSuccess({groupsAll: groups}));
    } catch (e) {
        console.log(e);
        yield put(actions.groupsAllFailure(e));
    }
}


export default function* watchReg() {
    yield takeLatest(GROUPS_ALL_REQUEST, workerGroupAll);
}
