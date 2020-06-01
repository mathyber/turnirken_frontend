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

class GroupsAll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
        this.props.groups(this.props.match.params.id);
        this.props.participants(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.participants !== this.props.participants) {

        }
    }

    onClickSave() {
    }

    onChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [value]: name
        });
        console.log(this.state);
    };


    render() {
        console.log(this.props);
        return (
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
                                                        style={{backgroundColor: "rgb(32,184,0)", color: "white"}}
                                                        name={group.id} as="select" key={last.id}
                                                        onChange={this.onChangeInput}>
                                                        <option value={"..."}>Выбрать участника...</option>

                                                        {this.props.tparticipants.map(partic => (
                                                            partic.login &&
                                                            <option key={partic.id}
                                                                    value={partic.id}>{partic.login}</option>
                                                        ))}

                                                    </FormControl> :
                                                    <FormControl readOnly defaultValue="Участник определится позже"/>

                                            }
                                        </Card>
                                    ))
                                }
                            </Card>)
                        )
                    }

                </div>
                <Button onClick={() => this.onClickSaveGrid()}>Сохранить</Button>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    // isAuth: selectorauth.isAuth(state),
    //  tournament: selectortour.getTourId(state),
    tparticipants: selectortour.getParticipants(state),
    //  getErrorGrid: selectortour.getErrorGrid(state),
    //  userProfile: selector.getProfile(state),
    groupsAll: selectorgr.groupsAll(state),
    //  matchesAll: selectorm.matchesAll(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            //  tour: (id) => actions.tournamentIdRequest(id),
            participants: (id) => actions.tournamentPartsRequest(id),
            groups: (id) => actions.groupsAllRequest(id),
            //  matches: (id) => actions.matchesAllRequest(id),
            //  saveGrid: (payload) => actions.tournamentSaveGridRequest(payload),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(GroupsAll);