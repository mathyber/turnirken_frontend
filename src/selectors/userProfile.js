const getProfile = state => state.userProfileReducer.userProfile;
const getPassError = state => state.userProfileReducer.passError;
const getEmailError = state => state.userProfileReducer.emailError;
const getFullProfile = state => state.userProfileReducer.fullUserProfile;

export default { getProfile, getFullProfile, getEmailError,getPassError }