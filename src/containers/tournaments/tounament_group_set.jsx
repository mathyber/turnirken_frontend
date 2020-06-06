import React from "react";
import Card from "react-bootstrap/Card";
import {bindActionCreators, compose} from "redux";
import actions from "../../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import selectorgr from "../../selectors/groups";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";

class GroupSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allGroups: false
        }

    }

    componentDidMount() {
        this.props.groupsTt(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    onClickSave() {

        this.props.save({
            ...this.state
        })
    }

    onChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
        if (this.props.groupsT.length === 1) {
            let t = this.props.groupsT.pop();
            this.setState({idGroup: t.idGroup });
        }
    };

    onChangeCheck = () => {
        this.setState({
            allGroups: !this.state.allGroups,
        });
    };

    render() {
        console.log(this.state);

        return (
            <Card className="card text-white bg-primary" style={{margin: '10px'}}
                  key={this.props.groupsT.id}>
                <Card.Header as="h5">Очки в группе {this.props.groupsT.groupName}</Card.Header>
                <Card className="card text-white bg-primary" style={{padding: '15px'}}>
                    <Form.Group controlId="formw">
                        <Form.Label>Очки за победу:</Form.Label>
                        <Form.Control type="number" name="numWin"
                                      onChange={this.onChangeInput}/>
                    </Form.Group>

                    <Form.Group controlId="formd">
                        <Form.Label>Очки за ничью:</Form.Label>
                        <Form.Control type="number" name="numDraw"
                                      onChange={this.onChangeInput}/>
                    </Form.Group>

                    <Form.Group>
                        <FormControl
                            name="idGroup" as="select"
                            onChange={this.onChangeInput}>

                            {this.props.groupsT.map(group => (
                                <option key={group}
                                        value={group.idGroup}>Группа {group.groupName}</option>
                            ))}

                        </FormControl>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                label="Для всех групп турнира"
                                name="allGroups"
                                id="1111111"
                                onChange={this.onChangeCheck}

                            />
                        </Col>
                    </Form.Group>
                </Card>
                <Button onClick={() => {
                    this.onClickSave();
                }}>
                    Сохранить
                </Button>
            </Card>


        )
    }
}

const mapStateToProps = (state) => ({
    groupsT: selectorgr.groupsT(state),
    // engine: state.engine
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
            groupsTt: (id) => actions.groupsRequest(id),
            save: (payload) => actions.groupsPointsRequest(payload)
        },
        dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(GroupSettings);