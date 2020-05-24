import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman } from "../utils/postman";
import {
    USER_REG_REQUEST,
    USER_REG_SUCCESS,
    USER_TEST_EMAIL_REQUEST,
    USER_TEST_LOGIN_REQUEST
} from "../actions/registration";

function* workerReg({ payload, history }) {
    try {
        yield call(() => postman.post('/user/registration', payload));
       // yield console.log(postman.get("identity/userInfo"));
        yield put(actions.userRegSuccess());
    } catch (e) {
        console.log(e);
        yield put(actions.userRegFailure(e));
    }
}

function* workerTestEmail({ payload, history }) {
    try {
        const b = yield call(() => postman.post('/user/registration/testEmail', payload));
        // yield console.log(postman.get("identity/userInfo"));
        console.log(b);
        if (b) yield put(actions.userTestEmailSuccess());
        else yield put(actions.userTestEmailFailure());
    } catch (e) {
        console.log(e);
        yield put(actions.userTestEmailFailure(e));
    }
}

function* workerTestLogin({ payload, history }) {
    try {
        const b = yield call(() => postman.post('/user/registration/testLogin', payload));
        // yield console.log(postman.get("identity/userInfo"));
        console.log(b);
        if (b) yield put(actions.userTestLoginSuccess());
        else yield put(actions.userTestLoginFailure());
    } catch (e) {
        console.log(e);
        yield put(actions.userTestLoginFailure(e));
    }
}

export default function* watchReg() {
    yield takeLatest(USER_REG_REQUEST, workerReg);
    yield takeLatest(USER_TEST_LOGIN_REQUEST, workerTestLogin);
    yield takeLatest(USER_TEST_EMAIL_REQUEST, workerTestEmail);
}
