const getTours = state => state.tourReducer.tournaments.reverse();
const getParticipants = state => state.tourReducer.participants;
const getTourId = state => state.tourReducer.tournament;
const getErrorCreate = state => state.tourReducer.createError;
const getErrorGrid = state => state.tourReducer.gridError;
const getErrorReg = state => state.tourReducer.regError;

export default { getTours, getErrorCreate, getErrorGrid, getTourId, getErrorReg, getParticipants }