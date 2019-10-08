import React from 'react';
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

import { conditionDefaultObj } from '../../Config/constants';

class FormPage extends React.Component {
    state = {
        formName: '',
        conditions: [{ ...conditionDefaultObj }]
    }

    handleChange = (event) => {
        if (['name', 'operator', 'value'].includes(event.target.name)) {
            const conditionNameId = event.target.dataset.id;
            const updatedConditions = [...this.state.conditions];
            updatedConditions[conditionNameId][event.target.name] = event.target.value;
            this.setState({
                conditions: updatedConditions
            })
        }
        else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    createUI = () => {
        return this.state.conditions.map((el, i) => {
            return (
                <div key={i}>
                    <Row>
                        <Col sm="3">
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                    data-id={i}
                                    type="text"
                                    value={el.name || ''}
                                    name="name"
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label>Operator</Label>
                                <Input
                                    data-id={i}
                                    type="text"
                                    value={el.operator || ''}
                                    name="operator"
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label>Value</Label>
                                <Input
                                    data-id={i}
                                    type="text"
                                    value={el.value || ''}
                                    name="value"
                                    onChange={(e) => this.handleChange(e)} />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <label>&nbsp;</label>
                            <div>
                                {i === this.state.conditions.length - 1 &&
                                    <Button
                                        color="primary"
                                        onClick={() => this.addClick()} >
                                        Add More
                                </Button>
                                }
                                {!i ? null :
                                    <Button
                                        color="danger"
                                        onClick={() => this.removeClick(i)} >
                                        Remove
                                </Button>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }
        )
    }

    addClick = () => {
        this.setState(prevState => (
            { conditions: [...prevState.conditions, { ...conditionDefaultObj }] }
        ))
    }

    removeClick = (i) => {
        let conditions = [...this.state.conditions];
        conditions.splice(i, 1);
        this.setState({ conditions });
    }

    handleSubmit = () => {
        console.log(this.state.conditions);
    }

    render() {
        return (
            <div>
                <h3>Form</h3>
                <div className="form-page">
                    <Row>
                        <Col sm="9">
                            <form>
                                <Row>
                                    <Col sm="3">
                                        <FormGroup>
                                            <Label>Form Name</Label>
                                            <Input
                                                type="text"
                                                name="formName"
                                                placeholder="Enter Name"
                                                onChange={this.handleChange}
                                                value={this.state.formName} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <h3>Condition</h3>
                                {this.createUI()}

                                <Button
                                    color="primary"
                                    onClick={this.handleSubmit} >
                                    Submit
                                </Button>
                            </form>
                        </Col>
                        <Col sm="3">
                            <h3>Result</h3>
                            <ul className="result">
                                {this.state.conditions.map(el => {
                                    if (el.name && el.operator && el.value) {
                                        return <li>{el.name} {el.operator} {el.value}</li>
                                    }
                                })}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default FormPage;