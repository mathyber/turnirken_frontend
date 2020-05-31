const getTours = state => state.tourReducer.tournaments.reverse();
const getErrorCreate = state => state.tourReducer.createError;
const getErrorGrid = state => state.tourReducer.gridError;

export default { getTours, getErrorCreate, getErrorGrid }