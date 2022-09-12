import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Button from '../Button';
import swal from 'sweetalert';

class UserCreateModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            gender: '',
            age: '',
        };
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
                if (this.state.password === this.state.passwordConfirm) {
                    return { type: true, errMessage: 'Valid Form Success' };
                } else {
                    return { type: false, errMessage: 'Password Confirm not match' };
                }
            } else {
                return { type: false, errMessage: 'Invalid Email' };
            }
        } else {
            return { type: false, errMessage: 'Email or Password required not null' };
        }
    };

    handleResetState = () => {
        this.setState({
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            gender: '',
            age: '',
        });
    };

    handleCreateUserOfModal = async () => {
        const validate = this.handleValidateForm();
        if (validate.type) {
            const user = { ...this.state };
            delete user.passwordConfirm;
            user.age = +user.age;
            if (this.props.roleId) {
                user.roleId = 'R2';
            }
            const respon = await this.props.handleCreateUser(user);
            if (respon.errCode === 0) {
                swal({
                    title: 'Create Success!',
                    icon: 'success',
                });
                this.toggle();
                this.handleResetState();
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
                text: validate.errMessage,
                icon: 'error',
            });
        }
    };

    render() {
        return (
            <div>
                <Modal zIndex="2" size="lg" isOpen={this.props.isShowModal} toggle={this.toggle}>
                    <ModalHeader>
                        <b>CREATE FORM</b>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-group col-4">
                                <label htmlFor="inputEmail4">Email</label>
                                <input
                                    value={this.state.email}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="inputEmail4"
                                    placeholder="Email"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="inputPassword4">Password</label>
                                <input
                                    value={this.state.password}
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="inputPassword4"
                                    placeholder="Password"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>

                            <div className="form-group col-4">
                                <label htmlFor="inputPassword5">Confirm Password</label>
                                <input
                                    value={this.state.passwordConfirm}
                                    type="password"
                                    className="form-control"
                                    name="passwordConfirm"
                                    id="inputPassword5"
                                    placeholder="Confirm Password"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    value={this.state.firstName}
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter your first name"
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
                                    placeholder="Enter your last name"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="lastName">Gender</label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="gender"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option hidden>Choice Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </Form.Select>
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
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle} small outline type="submit">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreateUserOfModal} small primary type="submit">
                            Create
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UserCreateModal;
