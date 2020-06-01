import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {LOGIN_LINK, TOUR_SETTINGS_LINK, TOURNAMENT_CREATE_LINK, TOURNAMENT_SETTINGS_LINK} from "../../routes/link";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import selectorauth from "../../selectors/auth";
import JwtHelper from "../../utils/jwtHelper";
import selectorreg from "../../selectors/registration";
import selector from "../../selectors/userProfile";
import Alert from "react-bootstrap/Alert";

class TournamentPage extends React.Component {
    date = new Date();

    constructor(props) {
        super(props);
        this.state ={
            num: 0
        }
    }

    componentDidMount() {
        this.props.tours();
     //   this.props.getUserProfile();
        // console.log(this.props.isAuth)
    }

    onParticipate(id){
        this.setState({num: id})
        this.props.reg({id: id});
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

                {
                    this.props.tournaments.map(tour => {
                        return (
                            <Card className="card text-white bg-primary" style={{margin: '12px'}} key={tour.id}>
                                <Card.Header as="h3"><b>{tour.tournamentName.name} {tour.season}</b></Card.Header>
                                { tour.logo && <Card.Img style={{width: '100%', height: '20ex', objectFit: 'cover'}} variant="top" src={tour.logo}/>}
                                <Card.Body>
                                    <Card.Title><b>Игра: {tour.tournamentName.game.name}</b></Card.Title>
                                    <Card.Text>
                                        { tour.info && tour.info.slice(0, 200)+"..."}
                                    </Card.Text>

                                    {
                                        tour.organizer.login === this.props.userProfile.login ?
                                            <Button variant="info" disabled={ Date.parse(tour.dateFinish) < this.date} href={TOUR_SETTINGS_LINK + tour.id}>
                                                {
                                                    <div>Редактировать</div>
                                                }
                                            </Button> :
                                            <Button variant="light" disabled={ Date.parse(tour.dateFinishReg) < this.date || !this.props.isAuth} onClick={()=>this.onParticipate(tour.id)}>
                                                {
                                                    Date.parse(tour.dateFinishReg) < this.date ? <div>Регистрация завершена</div> :
                                                        this.props.isAuth? <div>Участвовать</div>
                                                            : <div>Войдите, чтобы участвовать</div>
                                                }
                                            </Button>
                                    }
                                </Card.Body>
                            </Card>)

                    })
                }

            </Card>
        )
    }

}

const mapStateToProps = state => ({
    isAuth: selectorauth.isAuth(state),
    tournaments: selectortour.getTours(state),
    userProfile: selector.getProfile(state),
    regError: selectortour.getErrorReg(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            tours: () => actions.tournamentsAllRequest(),
            reg: (payload) => actions.tournamentRegRequest(payload),
         //   getUserProfile: () => dispatch(actions.userProfileRequest()),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TournamentPage);