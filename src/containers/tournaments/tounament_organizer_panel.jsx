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
import {TOUR_SETTINGS_LINK} from "../../routes/link";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import TournamentSettings from "./tounament_settings";

class TournamentOrganizerPanel extends React.Component {
    date = new Date();

    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
        this.props.tour(this.props.match.params.id);
        this.props.groups(this.props.match.params.id);
        this.props.matches(this.props.match.params.id);
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
        maap.length === this.props.tparticipants.length &&
        this.props.saveGM(model);
    }

    onChangeInputGroup = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [value]: { id: name, type: "group"}
        });
        console.log(this.state);
    };

    onChangeInputMatch = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [value]: { id: name, type: "match"}
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
                    this.props.getErrorGrid ?
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
                        <Card style={{width: '15rem', margin: '12px', overflowY: "scroll"}}>
                            <Card.Header as="h5">Участники {this.state.num}</Card.Header>
                            {
                                this.props.tparticipants.map(part => (
                                    part.id in this.state?
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
                </Card>

                <Button onClick={() => this.onClickSave()}>Сохранить</Button>


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
    matchesAll: selectorm.matchesAll(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            tour: (id) => actions.tournamentIdRequest(id),
            participants: (id) => actions.tournamentPartsRequest(id),
            groups: (id) => actions.groupsAllRequest(id),
            matches: (id) => actions.matchesAllRequest(id),
            saveGrid: (payload) => actions.tournamentSaveGridRequest(payload),
            saveGM: (payload) => actions.groupsSaveRequest(payload),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TournamentOrganizerPanel);