const matchesAll = state => state.matchesReducer.matchesAll;
const matchesTour = state => state.matchesReducer.matchesTour;
const matchT = (state) => state.matchesReducer.matchT;
const mError = state => state.matchesReducer.grError;

export default { matchesAll,mError,matchesTour,matchT }