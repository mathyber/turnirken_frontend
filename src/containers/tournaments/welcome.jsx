import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {useState} from 'react'
import {useHistory, withRouter} from "react-router";

import actions from '../../actions';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import selectorauth from "../../selectors/auth";
import Alert from "react-bootstrap/Alert";
import selector from "../../selectors/userProfile";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        this.props.getUserProfile();
        // console.log(this.props.isAuth)
    }

    render() {
        return (

            <Card className="card text-white bg-primary" style={{width: 'auto', margin: '12px'}}>
                <Card.Header as="h5">Добро пожаловать!</Card.Header>
                <Card.Body>
                    {
                        this.props.isAuth ? this.props.userProfile.login+", " : "Гость из интернетов, "
                    }
                        "Турниркен" рад Вас видеть! Здесь Вы можете участвовать в турнирах и проводить свои турниры, создавая для них турнирные сетки различной сложности.                    {
                        !this.props.isAuth && "Зарегистрируйтесь или войдите, чтобы полноценно использовать возможности нашего сайта."
                    }
                </Card.Body>
            </Card>
        )
    }
};

const mapStateToProps = state => ({
    isAuth: selectorauth.isAuth(state),
    userProfile: selector.getProfile(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getUserProfile: () => dispatch(actions.userProfileRequest()),
            // login: (data, history) => actions.userLoginRequest(data, history)
        }, dispatch
    );

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Welcome);
