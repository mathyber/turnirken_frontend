import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import selectorauth from "../../selectors/auth";
import selectorm from "../../selectors/matches";
import selector from "../../selectors/userProfile";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Group from "../../components/TournamentsModels/GroupModel";
import {TOUR_ORGANIZER_PANEL_LINK} from "../../routes/link";

class ProfileAuth extends React.Component {
    date1 = new Date();

    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            newPass: '',
            newPass2: '',
            newEmail: '',
            clkEm: false,
            clkPass: false
        }
    }

    componentDidMount() {
        this.props.getProfile();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userProfile.email !== this.props.userProfile.email) this.props.getUserProfile({id: this.props.user.id});
        if(prevProps.user !== this.props.user) this.props.getUserProfile({id: this.props.user.id});
        if(prevProps.errEmail !== this.props.errEmail) {
            this.props.getUserProfile({id: this.props.user.id});
        }
    }

    date(str) {
        let date = new Date(str);
        return date.toLocaleString();
    }

    onClickNewPass(){
        if(this.state.newPass === this.state.newPass2)
        this.props.newPassword({
            login: this.props.userProfile.login,
            password: this.state.pass,
            passwordNew: this.state.newPass,

        })
    }

    onClickNewEmail(){
            this.props.newEmail({
                email: this.state.email,
            })
    }

    onChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    onClick() {
    }

    render() {
        console.log(this.props);
        return (
            <Card style={{margin: '12px', marginRight: '5%', marginLeft: '5%'}}>
                <Card.Header as="h4">Ваш профиль <b>{this.props.userProfile.login}</b> </Card.Header>
                {
                    this.props.errPass ?
                        <Alert style={{margin: "15px"}} key="1" variant="danger">
                            При смене пароля произошла ошибка. Возможно, вы ввели неверный текущий пароль
                        </Alert> : this.props.errPass===false &&
                        <Alert style={{margin: "15px"}} key="2" variant="success">
                            Пароль успешно изменен
                        </Alert>
                }
                {
                    this.props.errEmail ?
                        <Alert style={{margin: "15px"}} key="3" variant="danger">
                            При смене E-mail произошла ошибка
                        </Alert> : this.props.errEmail===false &&
                        <Alert style={{margin: "15px"}} key="4" variant="success">
                            E-mail успешно изменен
                        </Alert>
                }
                <Card style={{margin: '12px', padding: "10px"}}>
                    <Card.Text>
                        E-mail: <b>{this.props.userProfile.email}</b>
                    </Card.Text>
                    <Card.Text>
                        ID пользователя: <b>{this.props.userProfile.id}</b>
                    </Card.Text>
                    <Button variant="info"
                            onClick={() => this.setState({clkEm: !this.state.clkEm})}>
                        {
                            <div>сменить e-mail</div>
                        }
                    </Button>

                    {
                        this.state.clkEm &&
                            <Form style={{margin: '12px', padding: "10px"}}>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Новый E-mail</Form.Label>
                                    <Form.Control type="email" name="email" onChange={this.onChangeInput}
                                    required/>
                                </Form.Group>
                                <Button variant="success" onClick={()=>this.onClickNewEmail()} style={{marginTop: "5px"}}
                                        >
                                    {
                                        <div>сохранить</div>
                                    }
                                </Button>
                            </Form>
                    }

                    <Button variant="info" style={{marginTop: "5px"}}
                            onClick={() => this.setState({clkPass: !this.state.clkPass})}>
                        {
                            <div>сменить пароль</div>
                        }
                    </Button>


                    {
                        this.state.clkPass &&
                        <Form style={{margin: '12px', padding: "10px"}}>
                            <Form.Group controlId="11111111111">
                                <Form.Label>Текущий пароль</Form.Label>
                                <Form.Control type="password" name="pass" onChange={this.onChangeInput}
                                              required/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.11111111111111">
                                <Form.Label>Новый пароль</Form.Label>
                                <Form.Control type="password" name="newPass" onChange={this.onChangeInput}
                                              required/>
                            </Form.Group>
                            <Form.Group controlId="111111111111.SelectCustom">
                                <Form.Label>Повторите новый пароль</Form.Label>
                                <Form.Control type="password" name="newPass2" onChange={this.onChangeInput}
                                              required/>
                            </Form.Group>
                            <Button variant="success" style={{marginTop: "5px"}}
                                    onClick={()=>this.onClickNewPass()}
                            disabled={this.state.pass==='' || this.state.newPass==='' || this.state.newPass2==='' || this.state.newPass !== this.state.newPass2}>
                                {
                                    <div>сменить пароль</div>
                                }
                            </Button>
                        </Form>
                    }

                </Card>


                <Card style={{margin: '12px'}}>
                    <Card.Header as="h5">Ваши последние матчи</Card.Header>
                    <div className="d-flex flex-wrap justify-content-around"
                         style={{maxHeight: "40rem", overflowY: "scroll"}}>
                        {
                            this.props.userProfile.matches && this.props.userProfile.matches.map(value => (
                                    <Card className="card text-white bg-primary"
                                          bg={value.finish === false ? value.player1 && value.player2 ? "danger" : "secondary" : "primary"}
                                          style={{margin: '10px', minWidth: "400px", maxHeight: "176px"}}
                                          key={value.id}>
                                        <Card.Header
                                            as="h6"><b>{value.tournament.name + " "+ value.tournament.season}</b>, {value.playoffStage ? value.playoffStage : value.groupName && "Группа " + value.groupName + ", тур " + value.round}</Card.Header>
                                        <CardGroup>
                                            <Card className="card text-white bg-secondary" style={{
                                                margin: '5px',
                                                padding: "5px",
                                                height: "30px",
                                                textAlign: "right",
                                                marginTop: "30px"
                                            }}>
                                                {
                                                    value.player1 ? value.player1.login : "---"
                                                }
                                            </Card>
                                            <Card.Title className="text-center"
                                                        style={{margin: '5px', padding: "5px", fontSize: "60px"}}>
                                                {
                                                    value.player1 ? value.resPlayer1 : "0"
                                                }
                                                :
                                                {
                                                    value.player2 ? value.resPlayer2 : "0"
                                                }
                                            </Card.Title>
                                            <Card className="card text-white bg-secondary" style={{
                                                margin: '5px',
                                                padding: "5px",
                                                height: "30px",
                                                marginTop: "30px"
                                            }}>
                                                {
                                                    value.player2 ? value.player2.login : "---"
                                                }
                                            </Card>
                                        </CardGroup>
                                        <Button onClick={() => this.props.history.push("/match/" + value.id)}>Перейти
                                            на страницу матча</Button>
                                    </Card>
                                )
                            )
                        }</div>
                </Card>

            </Card>


        )
    }
}

//this.props.userProfile.login === this.props.matchTt.player1.login?

const mapStateToProps = (state, id) => ({
    //   isAuth: selectorauth.isAuth(state),
    // tournament: selectortour.getTourId(state),
    // matchesGr: selectorm.matchGr(state),
    // groupTt: selector.groupT(state),
    //  getErrorGrid: selectortour.getErrorGrid(state),
    userProfile: selector.getFullProfile(state),
    user: selector.getProfile(state),
    errPass: selector.getPassError(state),
    errEmail: selector.getEmailError(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            // tour: (id) => actions.tournamentIdRequest(id),
            //  matchGr: (id) => actions.matchesGroupRequest(id),
            //    groupT: (id) => actions.groupRequest(id),
            getUserProfile: (payload) => actions.profileRequest(payload),
            newPassword: (payload) => actions.newPassRequest(payload),
            newEmail: (payload) => actions.newEmailRequest(payload),
            getProfile: () => dispatch(actions.userProfileRequest()),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ProfileAuth);