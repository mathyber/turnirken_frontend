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

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
          //  errors: false
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    };

    onSubmit = (event) => {
            if (this.state.login && this.state.password) {
                event.preventDefault();
                this.props.login({
                    login: this.state.login,
                    password: this.state.password
                }, this.props.history);
            } else console.log("ERROR");
          //  if (!this.props.isAuth) this.setState({errors: true})
    };


    render() {
        return (

            <Card style={{width: '25rem', margin: '12px'}}>
                <Card.Header as="h5">Вход</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="text" name="login" placeholder="Логин" onChange={this.onChangeInput}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Пароль"
                                          onChange={this.onChangeInput}/>
                        </Form.Group>
                        {
                            this.props.authError &&
                            <Alert key="1" variant="danger">
                                Логин или пароль неверен
                            </Alert>
                        }
                        <Button variant="primary" type="submit" disabled={!this.state.password || !this.state.login }>
                            Войти
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
};

const mapStateToProps = state => ({
    isAuth: selectorauth.isAuth(state),
    authError: selectorauth.authError(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({login: (data, history) => actions.userLoginRequest(data, history)}, dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(LoginForm);
