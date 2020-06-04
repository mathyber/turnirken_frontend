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

class TournamentPage extends React.Component {
    date = new Date();

    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            search: "",
            searchGame: ""
        }
    }

    componentDidMount() {
        this.props.search({
            str: ""
        });
        //   this.props.getUserProfile();
        // console.log(this.props.isAuth)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.search !== this.state.search) {
            this.props.search({
                str: this.state.search
            });
        }
        if (prevState.searchGame !== this.state.searchGame) {
            this.props.searchGame({
                str: this.state.searchGame
            });
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
        console.log(this.date);
        return (
            <Card style={{margin: '12px'}}>
                <ButtonGroup style={{margin: '12px'}}>
                    <Button href={TOURNAMENT_CREATE_LINK} disabled={!this.props.isAuth}>
                        {
                            this.props.isAuth ? <div>Создать турнир</div> : <div>Чтобы создать турнир, войдите</div>
                        }
                    </Button>
                </ButtonGroup>
                <Row>
                <Col style={{margin: '12px', marginRight: "0"}}>
                <Form.Group  controlId="formBasicLogin">
                    <Form.Control type="search" name="search" placeholder="поиск по названию турнира..."
                                  onChange={this.onChangeInput}/>
                </Form.Group>
                </Col>
                    <Col style={{margin: '12px', marginLeft: "0"}}>
                <Form.Group  >
                    <Form.Control type="search" name="searchGame" placeholder="поиск по названию игры..."
                                  onChange={this.onChangeInput}/>
                </Form.Group>
                </Col>
                </Row>
                {
                    this.props.tournaments.length !== 0 ? this.props.tournaments.map(tour => {
                            return (
                                <Card className="card text-white bg-primary" style={{margin: '12px'}} key={tour.id}>
                                    <Card.Header as="h3"><b>{tour.tournamentName} {tour.season}</b></Card.Header>
                                    {tour.logo &&
                                    <Card.Img style={{width: '100%', height: '20ex', objectFit: 'cover'}} variant="top"
                                              src={tour.logo}/>}
                                    <Card.Body>
                                        <Card.Title><b>Игра: {tour.gameName}</b></Card.Title>
                                        <Card.Text>
                                            {tour.info && tour.info.slice(0, 200) + "..."}
                                        </Card.Text>

                                        {
                                            tour.organizer.login === this.props.userProfile.login ?
                                                <Button variant="info" href={TOUR_ORGANIZER_PANEL_LINK + tour.id}>
                                                    {
                                                        <div>Редактировать</div>
                                                    }
                                                </Button> :
                                                <Button variant="light"
                                                        disabled={Date.parse(tour.dateFinishReg) < this.date || Date.parse(tour.dateFinish) < this.date || !this.props.isAuth}
                                                        onClick={() => this.onParticipate(tour.id)}>
                                                    {
                                                        Date.parse(tour.dateFinishReg) < this.date ?
                                                            <div>Регистрация завершена</div> :
                                                            this.props.isAuth ? <div>Участвовать</div>
                                                                : <div>Войдите, чтобы участвовать</div>
                                                    }
                                                </Button>
                                        }
                                    </Card.Body>
                                </Card>)

                        }) :
                        <Card className="card text-white bg-primary" style={{margin: '12px'}}>
                            <Card.Header as="h3"><b>Турниров нет. Но скоро будут</b></Card.Header>
                        </Card>
                }

            </Card>
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
            //   getUserProfile: () => dispatch(actions.userProfileRequest()),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TournamentPage);