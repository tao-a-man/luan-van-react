import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../Button';
import swal from 'sweetalert';
import userService from '../../services/userService';
import Calendar from 'react-calendar';

class UserCreateModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            fullName: '',
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
            fullName: '',
            age: '',
        });
    };

    handleCreateUserOfModal = async () => {
        const validate = this.handleValidateForm();
        if (validate.type) {
            const user = { ...this.state };
            delete user.passwordConfirm;
            user.age = +user.age;
            const respon = await userService.userServiceCreateUser(user);
            console.log(respon);
            if (respon.errCode === 0) {
                swal({
                    title: 'Create Success!',
                    icon: 'success',
                });
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
        const genders = this.props.gender;
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
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    value={this.state.fullName}
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="age">age</label>
                                <input
                                    value={this.state.age}
                                    type="text"
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
