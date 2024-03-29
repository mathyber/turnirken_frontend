const getTours = state => state.tourReducer.tournaments;
//const getToursS = state => state.tourReducer.tournamentsS;
const getParticipants = state => state.tourReducer.participants;
const getTourId = state => state.tourReducer.tournament;
const getErrorCreate = state => state.tourReducer.createError;
const getErrorGrid = state => state.tourReducer.gridError;
const getErrorReg = state => state.tourReducer.regError;
const getErrorDelPart = state => state.tourReducer.delPartError;
const getErrorDel = state => state.tourReducer.delError;

export default { getTours, getErrorCreate, getErrorGrid, getTourId, getErrorReg, getParticipants, getErrorDel, getErrorDelPart }