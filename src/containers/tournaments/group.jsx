import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import selectorauth from "../../selectors/auth";
import selectorm from "../../selectors/matches";
import selector from "../../selectors/groups";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Group from "../../components/TournamentsModels/GroupModel";

class GroupTour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.groupT(this.props.match.params.id);
        this.props.matchGr(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //    if(this.props.groupTt.results != prevProps.groupTt.results) this.props.groupT(this.props.match.params.id);
    }

    onClick() {
    }

    render() {
        console.log(this.props);
        return (
            <Card style={{margin: '12px', marginRight: '5%', marginLeft: '5%'}}>
                <Card.Header as="h4">Группа {this.props.groupTt.groupName} {this.props.groupTt.finish===true&&"(игры в группе завершились)"}</Card.Header>
                {this.props.matchesGr.length!=0 && <Card className="card text-white bg-primary" style={{margin: '10px', minWidth: "400px"}}>
                    <Button style={{fontSize:"20px"}} onClick={() => this.props.history.push("/tournament/" + this.props.matchTt.tournament.id)}>
                        Группа турнира <b>"{this.props.matchesGr[0].tournament.name + " " + this.props.matchesGr[0].tournament.season}"</b></Button>
                </Card>}

                <Card className="card text-white bg-primary" style={{margin: '10px', minWidth: "400px"}} key={this.props.groupTt.idGroup}>
                        {
                            this.props.groupTt.results && this.props.groupTt.results.map(result => (
                                <Card className="card text-white" bg={result.win===true? "success" :"primary"}  style={{margin: '5px'}} key={result.id}>
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
                                                padding: "5px", minWidth: '200px',
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
           
                </Card>

                <Card style={{margin: '12px'}}>
                    <Card.Header as="h5">Матчи группы</Card.Header>
                    <div className="d-flex flex-wrap justify-content-around" style={{ maxHeight: "40rem", overflowY: "scroll"}}>
                        {
                            this.props.matchesGr.map(value => (
                                    <Card className="card text-white bg-primary" bg={ value.finish===false? value.player1 ? value.player2 && "danger" : "secondary" : "primary" }
                                          style={{margin: '10px', minWidth: "400px", maxHeight:"176px"}}
                                          key={value.id}>
                                        <Card.Header
                                            as="h6">Стадия: {value.playoffStage ? value.playoffStage : value.groupName && "Группа " + value.groupName + ", тур " + value.round}
                                        </Card.Header>
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
    isAuth: selectorauth.isAuth(state),
    // tournament: selectortour.getTourId(state),
    matchesGr: selectorm.matchGr(state),
    groupTt: selector.groupT(state)
    //  getErrorGrid: selectortour.getErrorGrid(state),
   // userProfile: selector.getProfile(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            // tour: (id) => actions.tournamentIdRequest(id),
            matchGr: (id) => actions.matchesGroupRequest(id),
            groupT: (id) => actions.groupRequest(id),
            // saveGrid: (payload) => actions.tournamentSaveGridRequest(payload),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(GroupTour);