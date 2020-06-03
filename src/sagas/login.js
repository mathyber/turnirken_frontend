import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import { USER_LOGIN_REQUEST } from "../actions/login"
import JwtHelper from '../utils/jwtHelper';
import { postman } from "../utils/postman";

function* workerLogin({ payload, history }) {
    try {
        const {jwt} = yield call(() => postman.post('/login', payload));
      //  console.log(jwt);
        yield JwtHelper.saveToken(jwt);
       // yield console.log(postman.get("identity/userInfo"));
        yield put(actions.userLoginSuccess());
        yield history.push('/tournaments');
    } catch (e) {
        console.log(e);
        yield put(actions.userLoginFailure(e));
    }
}

export default function* watchLogin() {
    yield takeLatest(USER_LOGIN_REQUEST, workerLogin)
}
