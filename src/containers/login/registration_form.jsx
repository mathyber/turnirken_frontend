import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {useState} from 'react'
import {useHistory, withRouter} from "react-router";

import actions from '../../actions';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import selectorreg from "../../selectors/registration";
import Alert from "react-bootstrap/Alert";
import {LOGIN_LINK} from "../../routes/link";

class RegForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            confirmPassword: '',
            email: ''
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
  //  let history = useHistory();


    onChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        })
        if (event.target.name === "login") this.props.logtest({
            str: event.target.value
        });
        if (event.target.name === "email") this.props.emtest({
            str: event.target.value
        });
    };

    onSubmit = (event) => {
        if (this.state.password === this.state.confirmPassword && this.state.login && this.state.password){
            event.preventDefault();
            this.props.reg({
                login: this.state.login,
                password: this.state.password,
                email: this.state.email,
            }, this.props.history );
        }
        else console.log("ERROR");

    };
render(){
    return (

        <Card style={{ width: '25rem', margin: '12px' }}>
            <Card.Header as="h5">Регистрация</Card.Header>
            <Card.Body>
                <Form onSubmit={this.onSubmit}>
                    {
                        this.props.regError ?
                        <Alert key="1" variant="danger">
                            Логин или e-mail занят
                        </Alert> : this.props.regError===false &&
                            <Alert key="1" variant="success">
                                Вы успешно зарегистрированы, перейдите на <a href={LOGIN_LINK}>страницу входа</a>
                            </Alert>
                    }
                    <Form.Group controlId="formBasicLogin">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="text" name="login" placeholder="Логин" onChange={this.onChangeInput} required/>
                        {
                            this.state.login === ''? " ":
                            this.props.testLogin===false?
                                <Form.Text style={{color: "green"}}>
                                    Логин свободен
                                </Form.Text>
                                :
                                <Form.Text style={{color: "red"}}>
                                    Логин занят
                                </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" name="email" placeholder="E-mail" onChange={this.onChangeInput} required/>
                        {
                            this.state.email === ''? " ":
                                this.props.testEmail===false?
                                    <Form.Text style={{color: "green"}}>
                                        Email свободен
                                    </Form.Text>
                                    :
                                    <Form.Text style={{color: "red"}}>
                                        Email занят
                                    </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Пароль" onChange={this.onChangeInput} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword1">
                        <Form.Label>Повторите пароль</Form.Label>
                        <Form.Control type="password" name="confirmPassword" placeholder="Пароль" onChange={this.onChangeInput} required/>
                        {
                            this.state.password === this.state.confirmPassword ?
                                this.state.password &&
                                <Form.Text style={{color: "green"}}>
                                    Пароли совпадают
                                </Form.Text>
                                :     <Form.Text style={{color: "red"}}>
                                    Пароли не совпадают
                                </Form.Text>
                        }
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={this.state.password !== this.state.confirmPassword
                    || !this.state.password || !this.state.login || !this.state.email  }>
                        Зарегистрироваться
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )}
};

const mapStateToProps = state => ({
    regError: selectorreg.regError(state),
    testEmail: selectorreg.testEmail(state),
    testLogin: selectorreg.testLogin(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        reg: (data, history) => actions.userRegRequest(data, history),
        logtest: (data, history) => actions.userTestLoginRequest(data, history),
        emtest: (data, history) => actions.userTestEmailRequest(data, history)},
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(RegForm);
