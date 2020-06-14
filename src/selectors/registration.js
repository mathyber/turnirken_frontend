const regError = state => state.regReducer.regError;
const roleError = state => state.regReducer.roleError;
const roleI = state => state.regReducer.roleI;
const testLogin = state => state.regReducer.testLogin;
const testEmail = state => state.regReducer.testEmail;


export default { regError, testEmail, testLogin, roleError,roleI }