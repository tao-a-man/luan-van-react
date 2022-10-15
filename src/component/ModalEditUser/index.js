import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            gender: '',
            age: '',
            roleId: '',
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.user,
            roleId: this.props.user.managerData.roleId,
        });
    }

    toggle = () => {
        this.props.toggle();
    };

    handleChangeInput = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };

    handleValidateForm = () => {
        for (let key in this.state) {
            if (!this.state[key]) {
                return { type: false, errMessage: 'All fields must be not null' };
            }
        }
        if (this.state.email && this.state.password) {
            if (
                this.state.email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
            ) {
            } else {
                return { type: false, errMessage: 'Invalid Email' };
            }
        } else {
            return { type: false, errMessage: 'Email or Password required not null' };
        }
    };

    handleResetState = () => {
        this.setState({
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            gender: '',
            age: '',
            roleId: '',
        });
    };

    handleCreateUserEditModal = async () => {
        const valid = this.handleValidateForm();
        if (valid) {
            const user = this.state;
            const respon = await this.props.handleEditUser(user);
            if (respon.errCode === 0) {
                swal({
                    title: 'Edit Success!',
                    icon: 'success',
                });
                this.handleResetState();
                this.toggle();
            } else {
                swal({
                    title: 'Error',
                    text: respon.errMessage.errors[0].message,
                    icon: 'error',
                });
            }
        } else {
            swal({
                title: 'Error',
                text: 'Input must be required',
                icon: 'error',
            });
        }
    };

    render() {
        return (
            <div>
                <Modal zIndex="2" size="lg" isOpen={this.props.isOpen} toggle={this.toggle}>
                    <ModalHeader>
                        <b>EDIT FORM</b>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <input value={this.state.id} hidden disabled></input>
                            <div className="form-group col-6">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    value={this.state.firstName}
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter your firstName"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    value={this.state.lastName}
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Enter your lastName"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="age">Age</label>
                                <input
                                    value={this.state.age}
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    id="age"
                                    placeholder="Enter your age"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label>Gender</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="gender"
                                    onChange={(e) => this.handleChangeInput(e)}
                                    defaultValue={this.state.gender}
                                >
                                    <option hidden>Choice Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </Form.Select>
                            </div>
                            <div className="form-group col-6">
                                <label>RoleId</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="roleId"
                                    onChange={(e) => this.handleChangeInput(e)}
                                    defaultValue={this.state.roleId}
                                >
                                    <option hidden>Choice RoleId</option>
                                    <option value="R1">Admin</option>
                                    <option value="R2">Doctor</option>
                                    <option value="R3">User</option>
                                </Form.Select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-secondary" onClick={this.toggle}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={this.handleCreateUserEditModal}>
                            Edit User
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UserEditModal;
