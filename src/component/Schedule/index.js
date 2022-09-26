import React, { Component } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import swal from 'sweetalert';

import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';
import appService from '../../services/appService';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            age: '',
            userId: '',
        };
    }
    async componentDidMount() {
        const specialist = await appService.getSpecialist();
        const { id, fullname, username, age } = this.props.params;
        this.setState({
            userId: id,
            username,
            fullname,
            age,
        });
    }
    handleChangeInput = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };
    render() {
        return (
            <div className="row mt-4 ms-2 me-2">
                <input value={this.state.id} hidden disabled></input>
                <div className="form-group col-5">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">UserName</InputGroup.Text>
                        <Form.Control
                            value={this.state.username}
                            disabled
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-5">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">FullName</InputGroup.Text>
                        <Form.Control
                            value={this.state.fullname}
                            disabled
                            placeholder="Full Name"
                            aria-label="FullName"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-2 mb-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Age</InputGroup.Text>
                        <Form.Control
                            value={this.state.age}
                            disabled
                            placeholder="Age"
                            aria-label="Age"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
            </div>
        );
    }
}

export default withParamsAndNavigate(Schedule);
