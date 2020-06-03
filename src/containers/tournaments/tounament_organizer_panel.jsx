import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import selectorauth from "../../selectors/auth";
import selectorgr from "../../selectors/groups";
import selectorm from "../../selectors/matches";
import selector from "../../selectors/userProfile";
import Alert from "react-bootstrap/Alert";
import {REG_LINK, TOUR_SETTINGS_LINK} from "../../routes/link";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import TournamentSettings from "./tounament_settings";
import {FormRow} from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";

class TournamentOrganizerPanel extends React.Component {
    date = new Date();

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount() {
        this.props.tour(this.props.match.params.id);
        this.props.groups(this.props.match.params.id);
        this.props.groupsTt(this.props.match.params.id);
        this.props.matches(this.props.match.params.id);
        this.props.matchesAllInTour(this.props.match.params.id);
        this.props.participants(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.participants !== this.props.participants) {

        }
    }

    onClickSave() {
        let model = {
            groups: [],
            matches: []
        }

        let maap = Object.entries(this.state);

        maap.map(st => {
            console.log(st);
            if (st[1].type === "group") model.groups.push({id: st[1].id, idPart: st[0]});
            if (st[1].type === "match") model.matches.push({id: st[1].id, idPart: st[0]});
        })

        console.log(model);
        if (maap.length === this.props.tparticipants.length) {
            this.props.saveGM(model);
           // this.setState({err: false});
        }
    }

    onChangeInputGroup = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [value]: {id: name, type: "group"}
        });
        console.log(this.state);
    };

    onChangeInputMatch = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [value]: {id: name, type: "match"}
        });
        console.log(this.state);
    };

    render() {
        console.log(this.props);
        return (
            <Card style={{margin: '12px'}}>
                <Card.Header as="h4">Панель организатора турнира
                    "{this.props.tournament && this.props.tournament.tournamentName.name + " " + this.props.tournament.season}"</Card.Header>
                {
                    this.props.getErrorGrid || this.state.err ?
                        <Alert style={{margin: "15px"}} key="1" variant="danger">
                            При сохранении произошла ошибка
                        </Alert> : this.props.getErrorGrid === false &&
                        <Alert style={{margin: "15px"}} key="2" variant="success">
                            Сохранено
                        </Alert>
                }

                {this.props.tournament &&
                <Card className="card text-white bg-primary" style={{margin: '12px'}}>
                    {this.props.tournament.logo &&
                    <Card.Img style={{width: '100%', height: '20ex', objectFit: 'cover'}} variant="top"
                              src={this.props.tournament.logo}/>}
                    <Card.Body>
                        <Card.Title><b>Игра: {this.props.tournament.tournamentName.game.name}</b></Card.Title>
                        <Card.Text>
                            {this.props.tournament.info && this.props.tournament.info}
                        </Card.Text>
                    </Card.Body>
                </Card>
                }

                <TournamentSettings/>

                <Card style={{margin: '12px', padding: "15px"}}>
                    <Row>
                        <Card style={{margin: '12px'}}>
                            <Card.Header as="h5">Участники {this.state.num}</Card.Header>
                            <div style={{width: '15rem', height: "40rem", overflowY: "scroll"}}>

                                {
                                    this.props.tparticipants.map(part => (
                                        part.id in this.state ?
                                            <Card className="card text-white bg-success"
                                                  style={{margin: '5px', padding: "5px"}}
                                                  key={part.id}>
                                                {part.login ? part.login + " (выбран)" : "участника еще нет"}
                                            </Card> :
                                            <Card className="card text-white bg-primary"
                                                  style={{margin: '5px', padding: "5px"}}
                                                  key={part.id}>
                                                {part.login ? part.login : "участника еще нет"}
                                            </Card>)
                                    )
                                }
                            </div>
                        </Card>
                        <Card style={{margin: '12px'}}>
                            <Card.Header as="h5">Группы</Card.Header>
                            <div style={{width: '30rem', height: "40rem", overflowY: "scroll"}}>

                                {
                                    this.props.groupsAll.map(group => (
                                        <Card className="card text-white bg-primary" style={{margin: '10px'}}
                                              key={group.id}>
                                            <Card.Header as="h5">Группа {group.name}</Card.Header>
                                            {
                                                group.lasts.map(last => (
                                                    <Card style={{margin: '10px'}} key={last.id}>
                                                        {
                                                            last.thisType.name === "user" ?
                                                                <FormControl

                                                                    style={{
                                                                        backgroundColor: "rgb(32,184,0)",
                                                                        color: "white"
                                                                    }}
                                                                    name={group.id} as="select" key={last.id}
                                                                    onChange={this.onChangeInputGroup}>
                                                                    <option value={"..."}>Выбрать участника...</option>

                                                                    {this.props.tparticipants.map(partic => (
                                                                        partic.login &&
                                                                        <option key={partic.id}
                                                                                value={partic.id}>{partic.login}</option>
                                                                    ))}

                                                                </FormControl> :
                                                                <FormControl readOnly
                                                                             defaultValue="Участник определится позже"/>

                                                        }
                                                    </Card>
                                                ))
                                            }
                                        </Card>)
                                    )
                                }

                            </div>
                        </Card>

                        <Card style={{margin: '12px'}}>
                            <Card.Header as="h5">Матчи плей-офф</Card.Header>
                            <div style={{width: '30rem', height: "40rem", overflowY: "scroll"}}>

                                {
                                    this.props.matchesAll.map(group => (
                                        <Card className="card text-white bg-primary" style={{margin: '10px'}}
                                              key={group.id}>
                                            <Card.Header
                                                as="h5">{group.id_group ? "Матч группового этапа" : "Матч плей-офф"}</Card.Header>
                                            {
                                                group.lasts.map(last => (
                                                    <Card style={{margin: '10px'}} key={last.id}>
                                                        {
                                                            last.thisType.name === "user" ?
                                                                <FormControl
                                                                    style={{
                                                                        backgroundColor: "rgb(32,184,0)",
                                                                        color: "white"
                                                                    }}
                                                                    name={group.id} as="select" key={last.id}
                                                                    onChange={this.onChangeInputMatch}>
                                                                    <option value={"..."}>Выбрать участника...</option>

                                                                    {this.props.tparticipants.map(partic => (
                                                                        partic.login &&
                                                                        <option key={partic.id}
                                                                                value={partic.id}>{partic.login}</option>
                                                                    ))}

                                                                </FormControl> :
                                                                <FormControl readOnly
                                                                             defaultValue="Участник определится позже"/>

                                                        }
                                                    </Card>
                                                ))
                                            }
                                        </Card>)
                                    )
                                }


                            </div>
                        </Card>


                    </Row>

                    <Button onClick={() => this.onClickSave()}>Сохранить</Button>
                </Card>

                <Card style={{margin: '12px', padding: "15px"}}>
                    <Row>
                        <Card style={{margin: '12px', maxHeight: "50rem"}}>
                            <Card.Header as="h5">Матчи турнира</Card.Header>
                            <div style={{width: '30rem', height: "40rem", overflowY: "scroll"}}>
                                {
                                    this.props.matchesTour.map(value => (
                                            <Card className="card text-white bg-primary" bg={value.finish===false? value.player1 ? value.player2 && "danger" : "secondary" : "primary"}
                                                  style={{margin: '10px', minWidth: "400px"}}
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

                        <Card style={{margin: '12px', maxHeight: "50rem", width:"50rem"}}>
                            <Card.Header as="h5">Группы турнира</Card.Header>
                            <div style={{width: '50rem', height: "40rem", overflowY: "scroll"}}>
                                {
                                    this.props.groupsT.map(group => (
                                        <Card className="card text-white bg-primary" style={{margin: '10px'}}
                                              key={group.idGroup}>
                                            <Card.Header as="h5">Группа {group.groupName} {group.finish===true&&"(игры в группе завершились)"}</Card.Header>
                                            {
                                                group.results && group.results.map(result => (
                                                    <Card className="card text-white" bg={result.win==true? "success" :"primary"}  style={{margin: '5px'}} key={result.id}>
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
                                                                    padding: "5px", maxWidth: '200px', minWidth: '200px',
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
                                                                padding: "5px", fontSize: "15px", minWidth:"150px", textAlign:"center"
                                                            }}>
                                                                {
                                                                    result.winPoints+" : " + result.losingPoints + " "
                                                                }
                                                                (
                                                                    {
                                                                        result.winPoints - result.losingPoints
                                                                    }
                                                                    )
                                                            </Card.Title>
                                                                <Card bg={"info"} style={{
                                                                    margin: '5px',
                                                                    padding: "5px", fontSize: "20px", maxWidth: "40px", textAlign:"center"
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
                                            <Button onClick={() => this.props.history.push("/group/" + group.idGroup)}>Перейти
                                                на страницу группы</Button>
                                        </Card>
                                        )
                                    )
                                }
                            </div>
                        </Card>
                    </Row>
                </Card>


            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: selectorauth.isAuth(state),
    tournament: selectortour.getTourId(state),
    tparticipants: selectortour.getParticipants(state),
    getErrorGrid: selectortour.getErrorGrid(state),
    userProfile: selector.getProfile(state),
    groupsAll: selectorgr.groupsAll(state),
    groupsT: selectorgr.groupsT(state),
    matchesAll: selectorm.matchesAll(state),
    matchesTour: selectorm.matchesTour(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            tour: (id) => actions.tournamentIdRequest(id),
            participants: (id) => actions.tournamentPartsRequest(id),
            groups: (id) => actions.groupsAllRequest(id),
            groupsTt: (id) => actions.groupsRequest(id),
            matches: (id) => actions.matchesAllRequest(id),
            matchesAllInTour: (id) => actions.matchesRequest(id),
            saveGrid: (payload) => actions.tournamentSaveGridRequest(payload),
            saveGM: (payload) => actions.groupsSaveRequest(payload),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TournamentOrganizerPanel);