import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {LOGIN_LINK, TOUR_ORGANIZER_PANEL_LINK, TOURNAMENT_CREATE_LINK} from "../../routes/link";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import selectorauth from "../../selectors/auth";
import JwtHelper from "../../utils/jwtHelper";
import selectorreg from "../../selectors/registration";
import selector from "../../selectors/userProfile";

import * as SRD from "storm-react-diagrams"
import * as Match from "../../components/TournamentsModels/MatchModel"
import * as Final from "../../components/TournamentsModels/FinalModel"
import * as Group from "../../components/TournamentsModels/GroupModel"
import * as User from "../../components/TournamentsModels/UserModel"

import * as tTG from "./toTournamentGrig"
import * as vse from "storm-react-diagrams/dist/style.min.css"
import {UserModel} from "../../components/TournamentsModels/UserModel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import Alert from "react-bootstrap/Alert";
import selectorgr from "../../selectors/groups";
import selectorm from "../../selectors/matches";
import {Container} from "react-bootstrap";

class Tournament extends React.Component {
    date1 = new Date();
    engine = new SRD.DiagramEngine();
    model = new SRD.DiagramModel();

    constructor(props) {
        super(props);
        this.state = {
            grid: false,
            clk: false
        }
        this.engine.installDefaultFactories();
        this.engine.setDiagramModel(this.model);

    }

    date(str) {
        let date = new Date(str);
        return date.toLocaleDateString();
    }

    componentDidMount() {
        this.props.tour(this.props.match.params.id);
        this.props.groupsTt(this.props.match.params.id);
       // this.props.matches(this.props.match.params.id);
        this.props.matchesAllInTour(this.props.match.params.id);
        this.props.participants(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.tournament !== this.props.tournament) {
           // this.props.tour(this.props.match.params.id);
            if(this.props.tournament.grid!==null)
                this.model.deSerializeDiagram(JSON.parse(this.props.tournament.grid), this.engine);
        }

    }

    UNSAFE_componentWillUpdate(nextProps, nextState){
        if (nextProps.delPartError !== this.props.delPartError){
            this.props.tour(this.props.match.params.id);
            this.props.participants(this.props.match.params.id);
        }
        if (nextProps.regError !== this.props.regError){
            this.props.tour(this.props.match.params.id);
            this.props.participants(this.props.match.params.id);
        }
    }


    buttonStr(tour) {
        if (Date.parse(tour.dateFinish) < this.date1) return "Турнир завершен";
        else {
            if (Date.parse(tour.dateFinishReg) < this.date1) return "Регистрация завершена";
            else {
                if (Date.parse(tour.dateStart) < this.date1) return "Турнир уже идет";
                else {
                    if (Date.parse(tour.dateStartReg) > this.date1) return "Регистрация на турнир не началась";
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
      //  this.setState({upd: !this.state.upd});
    }

    onDeletePart(id) {
        this.props.deleteTournamentPart({
            id: id
        });
      //  this.setState({upd: !this.state.upd});
    }

    isModerOrAdmin(){

        for(let i=0; i<this.props.userProfile.roles.length; i++){
            if (this.props.userProfile.roles[i].name === "ROLE_ADMIN" || this.props.userProfile.roles[i].name === "ROLE_MODERATOR") return true;
        }
        return false;
    }

    onDelete() {
        this.props.deleteTournament({
            id: this.props.match.params.id
        }, this.props.history);
        this.setState({clk: false})
    }

    render() {
        console.log(this.props);
      //  console.log(this.);

        return (
            this.props.tournament &&
            <div style={{marginRight: '5%', marginLeft: '5%'}}>
            <Card style={{margin: '12px'}}>
                <Card className="card text-white"
                      bg={this.props.tournament.userReg === true ? "success" : "primary"}
                      style={{margin: '12px'}}
                      key={this.props.tournament.id}>
                    <Card.Header
                        as="h3"><b>{this.props.tournament.tournamentName} {this.props.tournament.season}</b>
                    </Card.Header>
                    {this.props.tournament.logo &&
                    <Card.Img style={{width: '100%', height: '30ex', objectFit: 'cover'}}
                              variant="top"
                              src={this.props.tournament.logo}/>}
                    <Card.Body>
                        <Card.Title><b>Игра: {this.props.tournament.gameName}</b> </Card.Title>
                        <Card.Title>Участников: {this.props.tournament.participants}/{this.props.tournament.maxParticipants},
                            организатор: {this.props.tournament.organizer.login}, регистрация на
                            участие: {this.date(this.props.tournament.dateStartReg)}
                            {
                                this.props.tournament.dateFinishReg != null ? <> - {this.date(this.props.tournament.dateFinishReg)}</> : Date.parse(this.props.tournament.dateStartReg) > this.date1 ? " - ?" : " - н.в."
                            }
                        </Card.Title>

                        <Card.Text>
                            {this.props.tournament.info && this.props.tournament.info.slice(0, 200) + ""}
                        </Card.Text>
                        {
                            (this.state.num === this.props.tournament.id  && this.props.delPartError !== false)  ? this.props.regError === true &&
                                <Alert key="1" variant="danger">
                                    При регистрации произошла ошибка
                                </Alert> : ""
                        }

                        {
                            this.props.tournament.organizer.user_id === this.props.userProfile.id ?
                                <Button variant="info"
                                        href={TOUR_ORGANIZER_PANEL_LINK + this.props.tournament.id}>
                                    {
                                        <div>Открыть панель организатора</div>
                                    }
                                </Button> :
                                <Button variant="light"
                                        disabled={this.buttonDisabled(this.props.tournament)}
                                        onClick={() => this.onParticipate(this.props.tournament.id)}>
                                    {
                                        this.buttonStr(this.props.tournament)
                                    }
                                </Button>
                        }
                        {
                            this.props.userProfile.roles != null && ((this.props.tournament.organizer.user_id === this.props.userProfile.id && this.props.tournament.dateStart === null)  ||( this.isModerOrAdmin() && this.props.tournament.dateFinish === null)) &&
                            <Button style={{marginLeft:"5px"}} variant={!this.state.clk ? "danger" : "success"} onClick={()=>this.setState({clk: !this.state.clk})}>
                                {
                                    !this.state.clk ?
                                    <div>Удалить турнир</div> : <div>Не удалять</div>
                                }
                            </Button>
                        }
                        {
                            this.state.clk &&
                            <Button style={{marginLeft:"5px"}} variant="danger" onClick={()=>this.onDelete()}>
                                {
                                    <div>Подтвердить удаление</div>
                                }
                            </Button>
                        }
                    </Card.Body>
                </Card>
                <Button style={{margin: '12px'}} onClick={() => this.setState({grid: !this.state.grid})}>{this.state.grid? "Закрыть ":"Открыть "} схему турнира</Button>
                {
                    this.state.grid && <SRD.DiagramWidget className="diagr" diagramEngine={this.engine}/>
                }

                <Card style={{margin: '12px'}}>
                    <Card.Header as="h5">Участники</Card.Header>
                    <div style={{maxHeight: "20em",overflowY: "scroll"}}>

                        {
                            this.props.tparticipants.map(part => (
                                    <Card  className="card text-white" bg={part.info && part.info==="Победитель" ? "warning" : "primary" }
                                          style={{margin: '10px',padding: "10px",paddingLeft:"50px"}}
                                          key={part.id}>
                                        <Row>
                                        {part.login ? <a style={{textDecoration: "none", color: "white"}} href={part.user_id && "/user/"+ part.user_id}>{part.login}</a> : "участника еще нет"}
                                        {part.info && " - "+ part.info}
                                        {
                                            ((this.props.tournament.organizer.user_id === this.props.userProfile.id && this.props.tournament.dateFinishReg === null) ||( this.props.userProfile.id === part.user_id && this.props.tournament.dateFinishReg === null)) &&
                                            <Button style={{marginLeft:"5px", padding: "0", paddingLeft:"10px", paddingRight:"10px"}} variant="danger" onClick={()=>this.onDeletePart(part.id)}>
                                                {
                                                    <div>убрать из списка участников</div>
                                                }
                                            </Button>
                                        }</Row>
                                    </Card>
                                )
                            )
                        }
                    </div>
                </Card>

                        <Card style={{margin: '12px'}}>
                            <Card.Header as="h5">Все матчи турнира</Card.Header>
                            <div className="d-flex flex-wrap justify-content-around" style={{ maxHeight: "40rem", overflowY: "scroll"}}>
                                {
                                    this.props.matchesTour.map(value => (
                                            <Card className="card text-white bg-primary"
                                                  bg={value.finish === false ? value.player1 && value.player2 ? "danger" : "secondary" : "primary"}
                                                  style={{margin: '10px', minWidth: "400px", maxHeight:"176px"}}
                                                  key={value.id}>
                                                <Card.Header
                                                    as="h6">Стадия: {value.playoffStage ? value.playoffStage : value.groupName && "Группа " + value.groupName + ", тур " + value.round}</Card.Header>
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

                        <Card style={{margin: '12px'}}>
                            <Card.Header as="h5">Группы турнира</Card.Header>
                            <div className="d-flex flex-wrap justify-content-around" style={{maxHeight: "40rem", overflowY: "scroll"}}>
                                {
                                    this.props.groupsT.map(group => (
                                            <Card className="card text-white bg-primary" style={{margin: '10px', width: "100%"}}
                                                  key={group.idGroup}>
                                                <Card.Header
                                                    as="h5">Группа {group.groupName} {group.finish === true && "(игры в группе завершились)"}</Card.Header>
                                                {
                                                    group.results && group.results.map(result => (
                                                        <Card className="card text-white"
                                                              bg={result.win === true ? "success" : "primary"}
                                                              style={{margin: '5px'}} key={result.id}>
                                                            {
                                                                <CardGroup>
                                                                    <Card.Title style={{
                                                                        margin: '5px',
                                                                        padding: "5px"
                                                                    }}>
                                                                        {
                                                                            result.place
                                                                        }
                                                                    </Card.Title>
                                                                    <Card className="card text-white bg-secondary" style={{
                                                                        margin: '5px',
                                                                        padding: "5px",

                                                                        minWidth: '200px',
                                                                    }}>
                                                                        <b>{
                                                                            result.part.login
                                                                        }</b>
                                                                    </Card>
                                                                    <Card.Title style={{
                                                                        margin: '5px',
                                                                        padding: "5px", fontSize: "15px"
                                                                    }}>
                                                                        {
                                                                            "Победы: " + result.wins
                                                                        }
                                                                    </Card.Title>
                                                                    <Card.Title style={{
                                                                        margin: '5px',
                                                                        padding: "5px", fontSize: "15px"
                                                                    }}>
                                                                        {
                                                                            "Ничьи: " + result.draw
                                                                        }
                                                                    </Card.Title>
                                                                    <Card.Title style={{
                                                                        margin: '5px',
                                                                        padding: "5px", fontSize: "15px"
                                                                    }}>
                                                                        {
                                                                            "Поражения: " + result.losing
                                                                        }
                                                                    </Card.Title>
                                                                    <Card.Title style={{
                                                                        margin: '5px',
                                                                        padding: "5px",
                                                                        fontSize: "15px",
                                                                        minWidth: "150px",
                                                                        textAlign: "center"
                                                                    }}>
                                                                        {
                                                                            result.winPoints + " : " + result.losingPoints + " "
                                                                        }
                                                                        (
                                                                        {
                                                                            result.winPoints - result.losingPoints
                                                                        }
                                                                        )
                                                                    </Card.Title>
                                                                    <Card bg={"info"} style={{
                                                                        margin: '5px',
                                                                        padding: "5px",
                                                                        fontSize: "20px",
                                                                        maxWidth: "40px",
                                                                        textAlign: "center"
                                                                    }}>
                                                                        {
                                                                            result.points
                                                                        }
                                                                    </Card>
                                                                </CardGroup>
                                                            }
                                                        </Card>
                                                    ))
                                                }
                                                <Card style={{margin: '5px', padding:'5px'}} className="card text-white bg-primary"> Очки за победу: {group.numWin}, очки за ничью: {group.numDraw}  </Card>
                                                <Button onClick={() => this.props.history.push("/group/" + group.idGroup)}>Перейти
                                                    на страницу группы</Button>
                                            </Card>
                                        )
                                    )
                                }
                            </div>
                        </Card>




            </Card></div>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: selectorauth.isAuth(state),
    tournament: selectortour.getTourId(state),
   // getErrorGrid: selectorthis.props.tournament.getErrorGrid(state),
    userProfile: selector.getProfile(state),
    // engine: state.engine
    regError: selectortour.getErrorReg(state),
    delPartError: selectortour.getErrorDelPart(state),
    groupsT: selectorgr.groupsT(state),
   // matchesAll: selectorm.matchesAll(state),
    matchesTour: selectorm.matchesTour(state),
    tparticipants: selectortour.getParticipants(state),

});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            participants: (id) => actions.tournamentPartsRequest(id),
            tour: (id) => actions.tournamentIdRequest(id),
            reg: (payload) => actions.tournamentRegRequest(payload),
            groupsTt: (id) => actions.groupsRequest(id),
            matchesAllInTour: (id) => actions.matchesRequest(id),
            deleteTournament: (payload, history) => actions.tournamentDeleteRequest(payload, history),
            deleteTournamentPart: (payload) => actions.tournamentPartDeleteRequest(payload),
            //saveGrid: (payload) => actions.tournamentSaveGridRequest(payload),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Tournament);