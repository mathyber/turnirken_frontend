import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';
import {NEW_EMAIL_REQUEST, NEW_PASS_REQUEST, PROFILE_REQUEST, USER_PROFILE_REQUEST} from "../actions/userProfile"
import JwtHelper from '../utils/jwtHelper';
import { postman, setAccessToken } from "../utils/postman";

function* workerUserInfo() {
    try {
        yield setAccessToken(JwtHelper.token);
        const profile = yield call(() => postman.get("/user/getUserinfo" ));
        console.log(profile);
        yield put(actions.userProfileSuccess({ userProfile: profile }));
    } catch (e) {
        console.log(e);
        yield put(actions.userProfileFailure(e));
    }
}


function* workerUser({payload}) {
    try {
        const profile = yield call(() => postman.post("/user/getProfile", payload ));
        console.log(profile);
        yield put(actions.profileSuccess({ fullUserProfile: profile }));
    } catch (e) {
        console.log(e);
        yield put(actions.profileFailure(e));
    }
}


function* workerNewPass({payload}) {
    try {
        yield call(() => postman.post("/user/newPassword", payload ));
       // console.log(profile);
        yield put(actions.newPassSuccess());
    } catch (e) {
        console.log(e);
        yield put(actions.newPassFailure(e));
    }
}


function* workerNewEmail({payload}) {
    try {
        yield call(() => postman.post("/user/newEmail", payload ));
       // console.log(profile);
        yield put(actions.newEmailSuccess());
    } catch (e) {
        console.log(e);
        yield put(actions.newEmailFailure(e));
    }
}

export default function* watchUserInfo() {
    yield takeLatest(USER_PROFILE_REQUEST, workerUserInfo)
    yield takeLatest(PROFILE_REQUEST, workerUser)
    yield takeLatest(NEW_EMAIL_REQUEST, workerNewEmail)
    yield takeLatest(NEW_PASS_REQUEST, workerNewPass)
}