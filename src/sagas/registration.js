import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import JwtHelper from '../utils/jwtHelper';
import { postman } from "../utils/postman";
import {USER_REG_REQUEST} from "../actions/registration";

function* workerReg({ payload, history }) {
    try {
        yield call(() => postman.post('/user/registration', payload));
       // yield console.log(postman.get("identity/userInfo"));
        yield put(actions.userRegSuccess());
        yield history.push('/');
    } catch (e) {
        console.log(e);
        yield put(actions.userRegFailure(e));
    }
}

export default function* watchReg() {
    yield takeLatest(USER_REG_REQUEST, workerReg)
}
