import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import selectorauth from "../../selectors/auth";
import selectorm from "../../selectors/matches";
import selector from "../../selectors/userProfile";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Group from "../../components/TournamentsModels/GroupModel";

class MatchTour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            click: false,
            finish: false,
            info: "info"
        }


    }

    componentDidMount() {
        this.props.matchT(this.props.match.params.id);
        this.props.getUserProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    onClick() {
        this.props.setRes({
            finish: this.state.finish,
            idMatch: this.props.matchTt.id,
            info: this.state.info,
            meRes: this.state.meRes,
            player2Res: this.state.player2Res
        })
    }

    onChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    };

    onChangeCheck = (event) => {
        this.setState({
            finish: !this.state.finish,
        });
    };

    render() {
        console.log(this.state);
        return (
            <Card style={{margin: '12px'}}>
                <Card.Header as="h4">Матч</Card.Header>
                <Card className="card text-white bg-primary" style={{margin: '10px', minWidth: "400px"}}>
                    <Card.Header
                        as="h6">Стадия: {this.props.matchTt.playoffStage ? this.props.matchTt.playoffStage : this.props.matchTt.groupName && "Группа " + this.props.matchTt.groupName + ", тур " + this.props.matchTt.round}</Card.Header>
                    <CardGroup>
                        <Card className="card text-white bg-secondary" style={{
                            margin: '5px',
                            padding: "5px",
                            height: "30px",
                            textAlign: "right",
                            marginTop: "30px"
                        }}>
                            {
                                this.props.matchTt.player1 ? this.props.matchTt.player1.login : "---"
                            }
                        </Card>
                        <Card.Title className="text-center" style={{margin: '5px', padding: "5px", fontSize: "60px"}}>
                            {
                                this.props.matchTt.player1 ? this.props.matchTt.resPlayer1 : "0"
                            }
                            :
                            {
                                this.props.matchTt.player2 ? this.props.matchTt.resPlayer2 : "0"
                            }
                        </Card.Title>
                        <Card className="card text-white bg-secondary"
                              style={{margin: '5px', padding: "5px", height: "30px", marginTop: "30px"}}>
                            {
                                this.props.matchTt.player2 ? this.props.matchTt.player2.login : "---"
                            }
                        </Card>
                    </CardGroup>

                    {
                        this.props.matchTt.player1 && this.props.matchTt.player2 ?
                        <Button disabled={this.props.matchTt.finish} onClick={() => this.setState({click: !this.state.click})}>{this.props.matchTt.finish? "Матч завершен" :"Установить счет"}</Button>
                        :   <Alert style={{margin: "15px"}} key="2" variant="primary">
                                В этом матче еще не известны все участники
                            </Alert>
                    }



                </Card>
                {
                    this.state.click &&
                    <Card style={{padding: "15px", margin: "15px"}}>
                        <Card.Body>
                            <Form.Group as={Row} controlId="exampleForm.SelectCustom">

                                <Form.Label column
                                            sm={2}>{this.props.userProfile.login === this.props.matchTt.player1.login ? "Ваш счет" : "Счет игрока " + this.props.matchTt.player1.login + ":"}</Form.Label>
                                <Col sm={2}>
                                    <Form.Control size="sm" type="number" name="meRes" onChange={this.onChangeInput}/>
                                </Col>
                                <Form.Label column
                                            sm={2}>{this.props.userProfile.login === this.props.matchTt.player2.login ? "Ваш счет" : "Счет игрока " + this.props.matchTt.player2.login + ":"}</Form.Label>
                                <Col sm={2}>
                                    <Form.Control size="sm" type="number" name="player2Res"
                                                  onChange={this.onChangeInput}/>
                                </Col>

                                <Col sm={2}>
                                    <Form.Check
                                        type="checkbox"
                                        label="финальный счет"
                                        name="finish"
                                        id="1111111"
                                        onChange={this.onChangeCheck}

                                    />
                                </Col>

                            </Form.Group>

                            <Col>
                                <Form.Label>Информация</Form.Label>
                                <Form.Control as="textarea" rows="3" name="info" onChange={this.onChangeInput}/>
                            </Col>

                        </Card.Body>
                        <Button size="sm" onClick={() => this.onClick()}>отправить</Button>
                    </Card>
                }

            </Card>


        )
    }
}

//this.props.userProfile.login === this.props.matchTt.player1.login?

const mapStateToProps = (state) => ({
    isAuth: selectorauth.isAuth(state),
    // tournament: selectortour.getTourId(state),
    matchTt: selectorm.matchT(state),
    //  getErrorGrid: selectortour.getErrorGrid(state),
    userProfile: selector.getProfile(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            // tour: (id) => actions.tournamentIdRequest(id),
            matchT: (id) => actions.matchRequest(id),
            setRes: (payload) => actions.setMatchResultRequest(payload),
            getUserProfile: () => dispatch(actions.userProfileRequest()),

            // saveGrid: (payload) => actions.tournamentSaveGridRequest(payload),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MatchTour);