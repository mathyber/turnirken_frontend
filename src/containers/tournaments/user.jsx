import React from "react";
import Card from "react-bootstrap/Card";
import selectortour from "../../selectors/tournaments";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import selectorauth from "../../selectors/auth";
import selectorr from "../../selectors/registration";
import selector from "../../selectors/userProfile";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Group from "../../components/TournamentsModels/GroupModel";
import {TOUR_ORGANIZER_PANEL_LINK} from "../../routes/link";

class Profile extends React.Component {
    date1 = new Date();

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getUserProfile({id: this.props.match.params.id});
     //   this.props.getUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //    if(this.props.groupTt.results != prevProps.groupTt.results) this.props.groupT(this.props.match.params.id);
    }


    UNSAFE_componentWillUpdate(nextProps, nextState){
        if (nextProps.roleI !== this.props.roleI){
            this.props.getUserProfile({id: this.props.match.params.id});
        }
    }

    date(str) {
        let date = new Date(str);
        return date.toLocaleString();
    }

    onModer(id) {
        this.props.setRole({
            id: id,
            role: "ROLE_MODERATOR"
        });
    }

    isAdmin(){
        for(let i=0; i<this.props.user.roles.length; i++){
            if (this.props.user.roles[i].name === "ROLE_ADMIN") return true;
        }
        return false;
    }

    isModer(){
        for(let i=0; i<this.props.userProfile.roles.length; i++){
            if (this.props.userProfile.roles[i].name === "ROLE_MODERATOR") return true;
        }
        return false;
    }


    render() {
        console.log(this.props);
        return (
            <Card style={{margin: '12px', marginRight: '5%', marginLeft: '5%'}}>
                <Card.Header as="h4">Пользователь <b>{this.props.userProfile.login}</b> </Card.Header>
                <Card style={{margin: '12px', padding: "10px"}}>
                    <Card.Text>
                        E-mail для связи с пользователем: <b>{this.props.userProfile.email}</b>
                    </Card.Text>
                    <Card.Text>
                        ID пользователя: <b>{this.props.userProfile.id}</b>
                    </Card.Text>
                    <Card.Text>
                        Принял участие в <b>{this.props.userProfile.numPs}</b> турнирaх(-e)
                        (<b>{this.props.userProfile.numW}</b> побед, <b>{this.props.userProfile.num2}</b> вторых
                        мест, <b>{this.props.userProfile.num3}</b> третьих мест)
                    </Card.Text>
                    <Card.Text>
                        Организовал <b>{this.props.userProfile.numOrg}</b> турнир(-a,-ов)
                    </Card.Text>

                    {
                        (this.props.userProfile.roles != null && this.props.user.roles != null && this.isAdmin()===true) && <Card>
                            {
                                this.isModer()===false?
                                    <Button variant="info"
                                            onClick={() => this.onModer(this.props.userProfile.id)}>
                                        {
                                            <div>сделать модератором</div>
                                        }
                                    </Button> : <Button variant="info"
                                                        onClick={() => this.onModer(this.props.userProfile.id)}>
                                        {
                                            <div>убрать роль модератора</div>
                                        }
                                    </Button>
                            }
                        </Card>
                    }


                </Card>


                <Card style={{margin: '12px'}}>
                    <Card.Header as="h5">Последние матчи пользователя</Card.Header>
                    <div className="d-flex flex-wrap justify-content-around"
                         style={{maxHeight: "40rem", overflowY: "scroll"}}>
                        {
                            this.props.userProfile.matches && this.props.userProfile.matches.map(value => (
                                    <Card className="card text-white bg-primary"
                                          bg={value.finish === false ? value.player1 && value.player2 ? "danger" : "secondary" : "primary"}
                                          style={{margin: '10px', width: "400px", maxHeight: "176px"}}
                                          key={value.id}>
                                        <Card.Header
                                            as="h6"><b>{value.tournament.name + " "+ value.tournament.season}</b>, {value.playoffStage ? value.playoffStage : value.groupName && "Группа " + value.groupName + ", тур " + value.round}</Card.Header>
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
                    <Card.Header as="h5">Последние турниры пользователя</Card.Header>
                    <div className="d-flex flex-wrap justify-content-around"
                         style={{maxHeight: "40rem", overflowY: "scroll"}}>
                        {this.props.userProfile.tournaments && this.props.userProfile.tournaments.map(tour =>
                            (
                                !tour.logo ?
                                    <Card className="card text-white"
                                          bg={tour.userReg === true ? "success" : "primary"}
                                          style={{margin: '10px', width: "400px", height:"220px"}}
                                          key={tour.id}>
                                        <Card.Header
                                            as="h6"><b>{tour.tournamentName} {tour.season}</b>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text><b>Игра: {tour.gameName}</b> </Card.Text>
                                            <Card.Text>Участников: {tour.participants},
                                                организатор: {tour.organizer.login}
                                            </Card.Text>
                                        </Card.Body>
                                        <Button variant={tour.userReg === true ? "success" : "primary"}
                                                            href={"/tournament/" + tour.id}>Перейти на страницу
                                        турнира</Button>
                                    </Card> :
                                    <Card className="card text-white"
                                          style={{margin: '10px', width: "400px", height:"220px"}}
                                          key={tour.id}>
                                        <Card.Img style={{width: "400px", height:"220px",objectFit: 'cover'}}
                                                  src={tour.logo}/>
                                        <Card.ImgOverlay>
                                            <Card.Title
                                                as="h6"><b>{tour.tournamentName} {tour.season}</b>
                                            </Card.Title>
                                            <Card.Text><b>Игра: {tour.gameName}</b> </Card.Text>
                                            <Card.Text>Участников: {tour.participants},
                                                организатор: {tour.organizer.login}
                                            </Card.Text><Button variant={tour.userReg === true ? "success" : "primary"}
                                                                href={"/tournament/" + tour.id}>Перейти на страницу турнира</Button>
                                        </Card.ImgOverlay>

                                    </Card>))}
                    </div>
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
    roleError: selectorr.roleError(state),
    roleI: selectorr.roleI(state),

    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            // tour: (id) => actions.tournamentIdRequest(id),
            //  matchGr: (id) => actions.matchesGroupRequest(id),
            //    groupT: (id) => actions.groupRequest(id),
            getUserProfile: (payload) => actions.profileRequest(payload),
         //   getUser: (payload) => actions.userProfileRequest(payload),
            setRole: (payload) => actions.setRoleRequest(payload),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Profile);