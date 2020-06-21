const groupsAll = state => state.groupsReducer.groupsAll;
const groupT = state => state.groupsReducer.groupT;
const groupsT = state => state.groupsReducer.groupsT;
const grError = state => state.groupsReducer.grError;
const grSError = state => state.groupsReducer.grSError;

export default { groupsAll,grError,groupT,groupsT, grSError }