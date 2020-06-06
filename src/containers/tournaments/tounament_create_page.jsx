import React from "react";
import Card from "react-bootstrap/Card";
import selectorreg from "../../selectors/registration";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {LOGIN_LINK, TOURNAMENT_CREATE_LINK} from "../../routes/link";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import selectortour from "../../selectors/tournaments";
import Alert from "react-bootstrap/Alert";

class TournamentCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            season: '',
            game: '',
            logo: '',
            maxParticipants: 16,
            onlyAdminResult: false,
            dateStartReg: '',
            dateFinishReg: '',
            info: ''
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.tourCreate(this.state
            , this.props.history);

    };

    render() {
        // console.log(this.state)
        return (
            <div style={{marginRight: '5%', marginLeft: '5%'}}>
                <Card style={{margin: '12px'}}>
                    <Card.Header as="h4">Создание турнира</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formBasicLogin">
                                <Form.Label>Название турнира</Form.Label>
                                <Form.Control type="text" name="name" onChange={this.onChangeInput}
                                              required/>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Сезон</Form.Label>
                                <Form.Control type="text" name="season" onChange={this.onChangeInput}
                                              required/>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Игра</Form.Label>
                                <Form.Control type="text" name="game" onChange={this.onChangeInput}
                                              required/>
                            </Form.Group>

                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Логотип (ссылка на изображение)</Form.Label>
                                <Form.Control type="text" name="logo" onChange={this.onChangeInput}
                                />

                            </Form.Group>
                            <Card style={{marginBottom: "12px"}}>
                                {
                                    this.state.logo &&
                                    <Card.Img
                                        style={{width: '100%', height: '30ex', objectFit: 'cover'}}
                                        src={this.state.logo}/>
                                }</Card>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Информация о турнире</Form.Label>
                                <Form.Control as="textarea" rows="3" name="info" onChange={this.onChangeInput}
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Макс. кол-во участников</Form.Label>
                                <Form.Control type="number" name="maxParticipants" min="2" max="100" onChange={this.onChangeInput}
                                              required/>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={3}>
                                    Результаты указывает
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Check
                                        type="radio"
                                        label="только организатор турнира"
                                        name="onlyAdminResult"
                                        id="only_admin_result_true"
                                        value="true"
                                        onChange={this.onChangeInput}

                                    />
                                    <Form.Check
                                        type="radio"
                                        label="участники"
                                        name="onlyAdminResult"
                                        id="only_admin_result_false"
                                        value="false"
                                        onChange={this.onChangeInput}
                                        checked
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Даты регистрации участников</Form.Label>
                                <Row>
                                    <Col sm={1}>
                                        c
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control type="date" name="dateStartReg" onChange={this.onChangeInput}
                                        />
                                    </Col>
                                    <Col sm={1}>
                                        до
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control type="date" name="dateFinishReg" onChange={this.onChangeInput}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                {
                                    this.props.createError ?
                                        <Alert key="1" variant="danger">
                                            При создании произошла ошибка
                                        </Alert> : this.props.createError === false &&
                                        <Alert key="1" variant="success">
                                            Турнир создан
                                        </Alert>
                                }
                            </Form.Group>
                            <Button style={{width: "100%"}} variant="primary" type="submit">
                                Далее
                            </Button>
                        </Form>
                    </Card.Body>
                </Card></div>
        )
    }
}

const mapStateToProps = state => ({
    createError: selectortour.getErrorCreate(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            tourCreate: (data, history) => actions.tournamentCreateRequest(data, history),
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TournamentCreatePage);