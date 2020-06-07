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
import {TOUR_ORGANIZER_PANEL_LINK} from "../../routes/link";

class ProfileAuth extends React.Component {
    date1 = new Date();

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getProfile();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.user !== this.props.user) this.props.getUserProfile({id: this.props.user.id});
    }

    date(str) {
        let date = new Date(str);
        return date.toLocaleString();
    }

    onClick() {
    }

    render() {
        console.log(this.props);
        return (
            <Card style={{margin: '12px', marginRight: '5%', marginLeft: '5%'}}>
                <Card.Header as="h4">Ваш профиль <b>{this.props.userProfile.login}</b> </Card.Header>
                <Card style={{margin: '12px', padding: "10px"}}>
                    <Card.Text>
                        E-mail: <b>{this.props.userProfile.email}</b>
                    </Card.Text>
                    <Card.Text>
                        ID пользователя: <b>{this.props.userProfile.id}</b>
                    </Card.Text>
                </Card>


                <Card style={{margin: '12px'}}>
                    <Card.Header as="h5">Ваши последние матчи</Card.Header>
                    <div className="d-flex flex-wrap justify-content-around"
                         style={{maxHeight: "40rem", overflowY: "scroll"}}>
                        {
                            this.props.userProfile.matches && this.props.userProfile.matches.map(value => (
                                    <Card className="card text-white bg-primary"
                                          bg={value.finish === false ? value.player1 && value.player2 ? "danger" : "secondary" : "primary"}
                                          style={{margin: '10px', minWidth: "400px", maxHeight: "176px"}}
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

            </Card>


        )
    }
}

//this.props.userProfile.login === this.props.matchTt.player1.login?

const mapStateToProps = (state, id) => ({
    //   isAuth: selectorauth.isAuth(state),
    // tournament: selectortour.getTourId(state),
    // matchesGr: selectorm.matchGr(state),
    // groupTt: selector.groupT(state),
    //  getErrorGrid: selectortour.getErrorGrid(state),
    userProfile: selector.getFullProfile(state),
    user: selector.getProfile(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            // tour: (id) => actions.tournamentIdRequest(id),
            //  matchGr: (id) => actions.matchesGroupRequest(id),
            //    groupT: (id) => actions.groupRequest(id),
            getUserProfile: (payload) => actions.profileRequest(payload),
            getProfile: () => dispatch(actions.userProfileRequest()),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ProfileAuth);