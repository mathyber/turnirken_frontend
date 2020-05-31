const getTours = state => state.tourReducer.tournaments.reverse();
const getTourId = (state) => state.tourReducer.tournament;
const getErrorCreate = state => state.tourReducer.createError;
const getErrorGrid = state => state.tourReducer.gridError;

export default { getTours, getErrorCreate, getErrorGrid, getTourId }