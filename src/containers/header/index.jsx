import { compose } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions/';
import Header from '../../components/Header';
import selector from "../../selectors/userProfile"
import selectorauth from "../../selectors/auth"
import { withRouter } from "react-router";

const mapStateToProps = state => ({
    userProfile: selector.getProfile(state),
    isAuth: selectorauth.isAuth(state)
});

const mapDispatchToProps = dispatch => ({
    logout: history => dispatch(actions.userLogoutSuccess(history)),
    getUserProfile: () => dispatch(actions.userProfileRequest()),
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Header);