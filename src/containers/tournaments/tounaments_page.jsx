import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
    LOGIN_LINK,
    TOUR_ORGANIZER_PANEL_LINK,
    TOUR_SETTINGS_LINK,
    TOURNAMENT_CREATE_LINK,
    TOURNAMENT_SETTINGS_LINK
} from "../../routes/link";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import selectorauth from "../../selectors/auth";
import JwtHelper from "../../utils/jwtHelper";
import selectorreg from "../../selectors/registration";
import selector from "../../selectors/userProfile";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoginForm from "../login/login_form";
import RegForm from "../login/registration_form";
import Welcome from "./welcome";


class TournamentPage extends React.Component {
    date1 = new Date();

    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            search: "",
            searchGame: "",
            page: 0,
            pageG: 0,
            e: true
        }
    }

    componentDidMount() {
        this.props.search({
            str: "" //, page: 0
        });
        //this.props.getUserProfile();
        // console.log(this.props.isAuth)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.search !== this.state.search) {
            this.setState({page: 0, e: true});
            this.props.search({
                str: this.state.search, page: 0
            });
        }
        if (prevState.searchGame !== this.state.searchGame) {
            this.setState({pageG: 0, e: false});
            this.props.searchGame({
                str: this.state.searchGame, page: 0
            });
        }
    }

    onClick() {
        if (this.state.e) {
            this.props.search({
                str: this.state.search, page: this.state.page + 1
            });
            this.setState({page: this.state.page + 1});
        } else {
            this.props.searchGame({
                str: this.state.searchGame, page: this.state.pageG + 1
            });
            this.setState({pageG: this.state.pageG + 1});
        }
        window.scrollTo(0, 0);
    }

    onClickPred() {
        if (this.state.e) {
            this.props.search({
                str: this.state.search, page: this.state.page - 1
            });
            this.setState({page: this.state.page - 1});
        } else {
            this.props.searchGame({
                str: this.state.searchGame, page: this.state.pageG - 1
            });
            this.setState({pageG: this.state.pageG - 1});
        }
    }


    date(str) {
        let date = new Date(str);
        return date.toLocaleDateString();
    }

    buttonStr(tour) {
        if (Date.parse(tour.dateFinish).toLocaleString() < this.date1) return "Турнир завершен";
        else {
            if (Date.parse(tour.dateFinishReg).toLocaleString() < this.date1) return "Регистрация завершена";
            else {
                if (Date.parse(tour.dateStart).toLocaleString() < this.date1) return "Турнир уже идет";
                else {
                    if (Date.parse(tour.dateStartReg).toLocaleString() > this.date1) return "Регистрация на турнир не началась";
                    else {
                        if (this.props.isAuth) {
                            if (!tour.userReg) return "Участвовать";
                            else return "Вы уже участвуете";
                        } else return "Войдите, чтобы участвовать";
                    }
                }
            }

        }

    }

    buttonDisabled(tour) {
        if (Date.parse(tour.dateFinish) < this.date1) return true;
        else {
            if (Date.parse(tour.dateFinishReg) < this.date1) return true;
            else {
                if (Date.parse(tour.dateStart) < this.date1) return true;
                else {
                    if (Date.parse(tour.dateStartReg) > this.date1) return true;
                    else {
                        if (this.props.isAuth) {
                            if (!tour.userReg) return false;
                            else return true;
                        } else return true;
                    }
                }
            }

        }

    }

    onParticipate(id) {
        this.setState({num: id})
        this.props.reg({id: id});
    }

    onChangeInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <div style={{marginRight: '5%', marginLeft: '5%'}}>
                <Row>
                    <Col>
                        <Card style={{margin: '12px', marginRight: "0"}}>
                            <ButtonGroup style={{margin: '12px'}}>
                                <Button href={TOURNAMENT_CREATE_LINK} disabled={!this.props.isAuth}>
                                    {
                                        this.props.isAuth ? <div>Создать турнир</div> :
                                            <div>Чтобы создать турнир, войдите</div>
                                    }
                                </Button>
                            </ButtonGroup>
                            <Row>
                                <Col style={{margin: '12px', marginRight: "0"}}>
                                    <Form.Group controlId="formBasicLogin">
                                        <Form.Control type="search" name="search"
                                                      placeholder="поиск по названию турнира..."
                                                      onChange={this.onChangeInput}/>
                                    </Form.Group>
                                </Col>
                                <Col style={{margin: '12px', marginLeft: "0"}}>
                                    <Form.Group>
                                        <Form.Control type="search" name="searchGame"
                                                      placeholder="поиск по названию игры..."
                                                      onChange={this.onChangeInput}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {
                                ((this.state.e === true && this.state.page !== 0) || (this.state.e === false && this.state.pageG !== 0)) &&
                                <Button variant="primary" style={{margin: '12px', marginTop: '0'}}
                                        onClick={() => this.onClickPred()}>
                                    предыдущая страница
                                </Button>
                            }

                            {
                                this.props.tournaments.length !== 0 ? this.props.tournaments.map(tour => {
                                        return (
                                            <Card className="card text-white"
                                                  bg={tour.userReg === true ? "success" : "primary"}
                                                  style={{margin: '12px'}}
                                                  key={tour.id}>
                                                <Card.Header
                                                    as="h3"><b>{tour.tournamentName} {tour.season}</b>
                                                </Card.Header>
                                                {tour.logo &&
                                                <Card.Img style={{width: '100%', height: '30ex', objectFit: 'cover'}}
                                                          variant="top"
                                                          src={tour.logo}/>}
                                                <Card.Body>
                                                    <Card.Title><b>Игра: {tour.gameName}</b> </Card.Title>
                                                    <Card.Title>Участников: {tour.participants}/{tour.maxParticipants},
                                                        организатор: {tour.organizer.login}, регистрация на
                                                        участие: {this.date(tour.dateStartReg)}
                                                        {
                                                            tour.dateFinishReg != null ? <> - {this.date(tour.dateFinishReg)}</> : Date.parse(tour.dateStartReg) > this.date1 ? " - ?" : " - н.в."
                                                        }
                                                    </Card.Title>

                                                    <Card.Text>
                                                        {tour.info && tour.info.slice(0, 200) + ""}
                                                    </Card.Text>
                                                    {
                                                        this.state.num === tour.id ? this.props.regError === true ?
                                                            <Alert key="1" variant="danger">
                                                                При регистрации произошла ошибка
                                                            </Alert> : this.props.regError === false &&
                                                            <Alert key="2" variant="success">
                                                                Вы теперь участвуете в этом турнире
                                                            </Alert> : ""
                                                    }
                                                    {
                                                        tour.organizer.user_id === this.props.userProfile.id ?
                                                            <Button variant="info"
                                                                    href={TOUR_ORGANIZER_PANEL_LINK + tour.id}>
                                                                {
                                                                    <div>Открыть панель организатора</div>
                                                                }
                                                            </Button> :
                                                            <Button variant="light"
                                                                    disabled={this.buttonDisabled(tour)}
                                                                    onClick={() => this.onParticipate(tour.id)}>
                                                                {
                                                                    this.buttonStr(tour)
                                                                }
                                                            </Button>
                                                    }
                                                </Card.Body>
                                                <Button variant={tour.userReg === true ? "success" : "primary"} href={"/tournament/" + tour.id}>Перейти на страницу турнира</Button>
                                            </Card>)

                                    }) :
                                    <Card className="card text-white bg-primary" style={{margin: '12px'}}>
                                        <Card.Header as="h3"><b>Турниров нет. Но скоро будут</b></Card.Header>
                                    </Card>
                            }
                            {
                                this.props.tournaments.length === 20 &&
                                <Button variant="primary" style={{margin: '12px', marginTop: '5px'}}
                                        onClick={() => this.onClick()}>
                                    следующая страница
                                </Button>
                            }


                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Card style={{margin: '12px', marginLeft: "0px"}}>
                            <Welcome/>
                            {

                                !this.props.isAuth && <div>
                                    <LoginForm/>
                                    <RegForm/>
                                </div>
                            }

                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: selectorauth.isAuth(state),
    tournaments: selectortour.getTours(state),
    // tournamentsS: selectortour.getToursS(state),
    userProfile: selector.getProfile(state),
    regError: selectortour.getErrorReg(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            tours: () => actions.tournamentsAllRequest(),
            search: (payload) => actions.tournamentSearchRequest(payload),
            searchGame: (payload) => actions.tournamentSearchGameRequest(payload),
            reg: (payload) => actions.tournamentRegRequest(payload),
            getUserProfile: () => dispatch(actions.userProfileRequest()),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TournamentPage);