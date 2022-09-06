import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../Button';
import swal from 'sweetalert';

class UserEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            fullName: '',
            age: '',
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.user,
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
        if (this.state.fullName && this.state.age) {
            return true;
        } else return false;
    };

    handleResetState = () => {
        this.setState({
            id: '',
            email: '',
            fullName: '',
            age: '',
        });
    };

    handleCreateUserEditModal = async () => {
        const valid = this.handleValidateForm();
        console.log(valid);
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
        console.log(this.state);
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
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    value={this.state.fullName}
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Enter your fullName"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="age">Age</label>
                                <input
                                    value={this.state.age}
                                    type="text"
                                    className="form-control"
                                    name="age"
                                    id="age"
                                    placeholder="Enter your Age"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={this.toggle}
                            small
                            iconLeft={<i className="fas fa-times"></i>}
                            outline
                            type="submit"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleCreateUserEditModal}
                            small
                            iconLeft={<i className="fas fa-check"></i>}
                            primary
                            type="submit"
                        >
                            Edit User
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UserEditModal;
