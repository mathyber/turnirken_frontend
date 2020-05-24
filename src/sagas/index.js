import { fork, all } from 'redux-saga/effects';

import login from './login.js';
import logout from './logout.js';
import userProfile from './userProfile.js';
import reg from './registration.js';

export default function* rootSaga() {
    yield all([fork(login), fork(logout), fork(userProfile), fork(reg)])
};