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

class GroupSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

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
    };


    render() {
        console.log(this.state);

        return (
            <Card className="card text-white bg-primary" style={{margin: '10px'}}
                  key={this.props.groupsT.id}>
                <Card.Header as="h5">Баллы в группе {this.props.groupsT.groupName}</Card.Header>
                <Card className="card text-white bg-primary" style={{padding: '15px'}}>
                    <Form.Group controlId="formw">
                        <Form.Label>Баллы за победу:</Form.Label>
                        <Form.Control type="number" name="numWin"
                                      onChange={this.onChangeInput}/>
                    </Form.Group>

                    <Form.Group controlId="formd">
                        <Form.Label>Баллы за ничью:</Form.Label>
                        <Form.Control type="number" name="numDraw"
                                      onChange={this.onChangeInput}/>
                    </Form.Group>

                    <Form.Group>
                        <FormControl
                            name="idGroup" as="select"
                            onChange={this.onChangeInput}>
                            <option value={"..."}>Выбрать группу...</option>

                            {this.props.groupsT.map(group => (
                                <option key={group}
                                        value={group.idGroup}>{group.groupName}</option>
                            ))}

                        </FormControl>
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