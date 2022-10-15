import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import UserCreateModal from '../ModalCreateUser';
import UserEditModal from '../ModalEditUser';

class Gdtest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            isShowEditModal: { type: false, user: {} },
            users: [],
        };
    }
    state = {};
    handleCreateUser = (user) => {
        const newuser = [...this.state.users, user];
        this.setState({ users: newuser });
        return { errCode: 0, errMessage: 'User created successfully' };
    };
    toggleCreate = () => {
        this.setState({ isShowModal: !this.state.isShowModal });
    };
    toggleEdit = () => {
        this.setState({ isShowEditModal: { type: !this.state.isShowEditModal.type, user: [] } });
    };
    handleEditUser = () => {
        return { errCode: 0, errMessage: 'User created successfully' };
    };
    handleShowEditModal = (user, index) => {
        const newUser = { ...user };
        newUser.id = index;
        this.setState({ isShowEditModal: { type: true, user: newUser } });
    };
    render() {
        return (
            <>
                <Button
                    className="mt-4 ms-4"
                    variant="primary"
                    onClick={() => {
                        this.setState({ isShowModal: true });
                    }}
                >
                    Create User
                </Button>
                <UserCreateModal
                    handleCreateUser={this.handleCreateUser}
                    isShowModal={this.state.isShowModal}
                    toggle={this.toggleCreate}
                />
                <UserEditModal
                    toggle={this.toggleEdit}
                    isOpen={this.state.isShowEditModal.type}
                    user={this.state.isShowEditModal.user}
                    handleEditUser={this.handleEditUser}
                />
                <Table striped bordered hover className="mt-4 ms-4 me-4">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <button
                                            onClick={(e) => this.handleShowEditModal(user, index)}
                                            className="btn btn-primary btn-custom"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => this.handleDeleteUser(user.id)}
                                            className="btn btn-danger btn-custom ms-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default Gdtest;
