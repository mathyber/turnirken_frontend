import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {LOGIN_LINK, TOURNAMENT_CREATE_LINK} from "../../routes/link";
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

class TournamentSettings extends React.Component {
    date = new Date();
    engine = new SRD.DiagramEngine();
    model = new SRD.DiagramModel();

    constructor(props) {
        super(props);
        this.state = {
            group: "A",
            groupNum: 4,
            groupNumWin: 2,
            stage: "Финал",
            place: 3,
            grid: false,
        }
        this.engine.installDefaultFactories();
        this.engine.setDiagramModel(this.model);

    }

    componentDidMount() {
        this.props.tour(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.tournament !== this.props.tournament) {
            if(this.props.tournament.grid===null) {this.setState({grid:true});
            for (let i = 0; i < this.props.tournament.maxParticipants; i++) {
                this.model.addNode(new User.UserModel("Участник " + (i + 1))).setPosition(10, 10 + (i * 50));
            }
            this.model.addNode(new Final.FinalModel(1)).setPosition(400, 200);}
            else {
                this.model.deSerializeDiagram(JSON.parse(this.props.tournament.grid), this.engine);
            }
        }
    }

    onClickSaveGrid() {
        console.log(this.model.serializeDiagram());
        console.log(tTG.default(this.model.serializeDiagram()));
        this.props.saveGrid({
            grid: JSON.stringify(this.model.serializeDiagram()),
            users: tTG.default(this.model.serializeDiagram()).users,
            results: tTG.default(this.model.serializeDiagram()).results,
            matches: tTG.default(this.model.serializeDiagram()).matches,
            groups: tTG.default(this.model.serializeDiagram()).groups,
            id: this.props.match.params.id
        })
    }

    onChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
            [name + "num"]: this.state[name + "num"]++
        });
    };


    render() {
        console.log(this.props);
        console.log(this.engine);

        return (
            <Card style={{margin: '12px'}}>
                <Card.Header as="h4">Создание схемы турнира {this.props.tournament && this.props.tournament.tournamentName.name +" "+ this.props.tournament.season}</Card.Header>
                {
                    this.props.getErrorGrid ?
                        <Alert style={{margin: "15px"}} key="1" variant="danger">
                            При сохранении произошла ошибка
                        </Alert> : this.props.getErrorGrid===false &&
                        <Alert style={{margin: "15px"}} key="2" variant="success">
                            Сохранено
                        </Alert>
                }

                {
                    this.state.grid &&
                    <Card.Body>

                    <Form.Group style={{fontSize: "13px"}} as={Row} controlId="exampleForm.SelectCustom">
                        <Form.Label column sm={2}>Имя группы:</Form.Label>
                        <Col sm={2}>
                            <Form.Control size="sm" type="text" name="group" onChange={this.onChangeInput}/>
                        </Col>
                        <Form.Label column sm={2}>Участников в группе:</Form.Label>
                        <Col sm={1}>
                            <Form.Control size="sm" type="number" name="groupNum" onChange={this.onChangeInput}/>
                        </Col>
                        <Form.Label column sm={2}>Выходит из группы:</Form.Label>
                        <Col sm={1}>
                            <Form.Control size="sm" type="number" name="groupNumWin" onChange={this.onChangeInput}/>
                        </Col>
                        <Col sm={1}>
                            <Button size="sm" onClick={() => {
                                this.model.addNode(new Group.GroupModel(this.state.group, this.state.groupNum, this.state.groupNumWin, this.state.groupNum)).setPosition(400, 200);
                            }}>+группа</Button>
                        </Col>

                    </Form.Group>
                    <Form.Group style={{fontSize: "13px"}} as={Row} controlId="exampleForm.SelectCustom">

                        <Form.Label column sm={2}>Стадия:</Form.Label>
                        <Col sm={2}>
                            <Form.Control size="sm" type="text" name="stage" onChange={this.onChangeInput}/>
                        </Col>
                        <Col sm={1}>
                            <Button size="sm" onClick={() => {
                                this.model.addNode(new Match.MatchModel(this.state.stage)).setPosition(400, 200);
                            }}>+матч</Button></Col>
                        <Form.Label column sm={1}></Form.Label>
                        <Form.Label column sm={2}>Место:</Form.Label>
                        <Col sm={2}>
                            <Form.Control size="sm" type="number" name="place" onChange={this.onChangeInput}/>
                        </Col>
                        <Col sm={1}>
                            <Button size="sm" onClick={() => {
                                this.model.addNode(new Final.FinalModel(this.state.place)).setPosition(400, 200);
                            }}>+место</Button></Col>
                    </Form.Group>

                </Card.Body>}

                <SRD.DiagramWidget diagramEngine={this.engine}/>
                {
                    this.state.grid && <Button onClick={() => this.onClickSaveGrid()}>Сохранить</Button>
                }

            </Card>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: selectorauth.isAuth(state),
    tournament: selectortour.getTourId(state),
    getErrorGrid: selectortour.getErrorGrid(state),
    userProfile: selector.getProfile(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            tour: (id) => actions.tournamentIdRequest(id),
            saveGrid: (payload) => actions.tournamentSaveGridRequest(payload),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TournamentSettings);