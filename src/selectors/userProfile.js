const getProfile = state => state.userProfileReducer.userProfile;
const getFullProfile = state => state.userProfileReducer.fullUserProfile;

export default { getProfile, getFullProfile }