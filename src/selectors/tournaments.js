const getTours = state => state.tourReducer.tournaments.reverse();
const getErrorCreate = state => state.tourReducer.createError;

export default { getTours, getErrorCreate }