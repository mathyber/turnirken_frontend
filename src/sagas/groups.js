import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman } from "../utils/postman";

import {
    GROUP_REQUEST,
    GROUPS_ALL_REQUEST,
    GROUPS_POINTS_REQUEST,
    GROUPS_REQUEST,
    GROUPS_SAVE_REQUEST
} from "../actions/groups";

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

function* workerGroups({ payload, history }) {
    try {
        let groups = yield call(() => postman.post('/groups/getGroupsTour', {id:payload}));
        yield console.log(groups);
        yield put(actions.groupsSuccess({groupsT: groups}));
    } catch (e) {
        console.log(e);
        yield put(actions.groupsFailure(e));
    }
}

function* workerGroup({ payload, history }) {
    try {
        let group = yield call(() => postman.post('/groups/getGroup', {id:payload}));
        yield console.log(group);
        yield put(actions.groupSuccess({groupT: group}));
    } catch (e) {
        console.log(e);
        yield put(actions.groupFailure(e));
    }
}


function* workerGroupSave({ payload, history }) {
    try {
        yield call(() => postman.post('/tournaments/setStartPositions', payload));
       // yield console.log(groups);
        yield put(actions.groupsSaveSuccess());
    } catch (e) {
        console.log(e);
        yield put(actions.groupsSaveFailure(e));
    }
}


function* workerGroupPoints({ payload, history }) {
    try {
        yield call(() => postman.post('/groups/getGroupsPoints', payload));
        // yield console.log(groups);
        yield put(actions.groupsPointsSuccess());
    } catch (e) {
        console.log(e);
        yield put(actions.groupsPointsFailure(e));
    }
}

export default function* watchReg() {
    yield takeLatest(GROUPS_ALL_REQUEST, workerGroupAll);
    yield takeLatest(GROUPS_SAVE_REQUEST, workerGroupSave);
    yield takeLatest(GROUPS_REQUEST, workerGroups);
    yield takeLatest(GROUPS_POINTS_REQUEST, workerGroupPoints);
    yield takeLatest(GROUP_REQUEST, workerGroup);
}
