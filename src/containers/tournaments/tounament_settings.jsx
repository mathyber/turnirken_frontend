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

class TournamentSettings extends React.Component {
    date = new Date();
    engine = new SRD.DiagramEngine();
    model = new SRD.DiagramModel();
    constructor(props) {
        super(props);
        this.diagr = React.createRef();
        this.engine.installDefaultFactories();
        this.engine.setDiagramModel(this.model);
    }

    componentDidMount() {
        this.props.tours();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    onClickSaveGrid(){
        console.log(this.model.serializeDiagram());
        console.log(tTG.default(this.model.serializeDiagram()));
        this.props.saveGrid({grid: tTG.default(this.model.serializeDiagram()), id: this.props.match.params.id});
    }


    render() {
        console.log(this.props);
        console.log(this.engine);


        return (
            <Card style={{margin: '12px'}}>
                <SRD.DiagramWidget ref={this.diagr} diagramEngine={this.engine} />
                <Button onClick={() => this.onClickSaveGrid()}>Отправить</Button>
                <Button onClick={()=> {
                    this.model.addNode(new User.UserModel("Участник")).setPosition(400, 200);
                }}>Добавить участника</Button>
                <Button onClick={()=> {
                    this.model.addNode(new Group.GroupModel("Группа", 4, 2, 4)).setPosition(400, 200);
                }}>Добавить группу</Button>
                <Button onClick={()=> {
                    this.model.addNode(new Match.MatchModel("Матч")).setPosition(400, 200);
                }}>Добавить матч</Button>
                <Button onClick={()=> {
                    this.model.addNode(new Final.FinalModel(0)).setPosition(400, 200);
                }}>Добавить результат</Button>
            </Card>


        )
    }
}

const mapStateToProps = state => ({
    isAuth: selectorauth.isAuth(state),
    tournaments: selectortour.getTours(state),
    getErrorGrid: selectortour.getErrorGrid(state),
    userProfile: selector.getProfile(state),
   // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            tours: () => actions.tournamentsAllRequest(),
            saveGrid: (payload) => dispatch(actions.tournamentSaveGridRequest(payload)),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TournamentSettings);