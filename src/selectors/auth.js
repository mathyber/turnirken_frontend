const isAuth = state => state.loginReducer.isAuth;
const authError = state => state.loginReducer.authError;

export default { isAuth, authError }