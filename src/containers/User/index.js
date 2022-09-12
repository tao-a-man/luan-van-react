import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Button from '../../component/Button';
import { userLogoutSuccess } from '../../store/actions';
import userService from '../../services/userService';
import ModalEditUser from '../../component/ModalEditUser';
import ModalCreateUser from '../../component/ModalCreateUser';

class User extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        userSearch: [],
        user: [],
        isShowEditModal: { type: false, user: {} },
        valueSearch: '',
        isShowCreateModal: false,
    };

    componentDidMount() {
        this.getUser(this.props.token);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.valueSearch !== nextState.valueSearch) {
            const newUsers = this.state.userSearch.filter((item) => {
                return (
                    item.firstName.match(nextState.valueSearch) ||
                    item.lastName.match(nextState.valueSearch) ||
                    item.id.toString().match(nextState.valueSearch) ||
                    item.age.toString().match(nextState.valueSearch)
                );
            });
            nextState.user = newUsers;
            return true;
        } else {
            return true;
        }
    }

    async getUser(token) {
        const data = await userService.userServiceGetAllUser(token);
        this.setState({ user: data.user, userSearch: data.user });
    }

    handleLoggout = () => {
        this.props.userLogoutSuccess();
    };

    handleShowEditModal = (user) => {
        this.setState({ isShowEditModal: { type: true, user: user } });
    };

    handleToggleEditModal = () => {
        this.setState({ isShowEditModal: { ...this.state.isShowEditModal, type: !this.state.isShowEditModal } });
    };
    handleToggleCreateModal = () => {
        this.setState({ isShowCreateModal: !this.state.isShowCreateModal });
    };

    handleCreateUser = async (user) => {
        const respon = await userService.userServiceCreateUser(user);
        await this.getUser(this.props.token);
        return respon;
    };

    handleEditUser = async (user) => {
        const respon = await userService.userServiceEditUser(user, this.props.token);
        await this.getUser(this.props.token);
        return respon;
    };

    handleDeleteUser = async (id) => {
        const respon = await userService.userServiceDeleteUser(id, this.props.token);
        this.getUser(this.props.token);
        return respon;
    };

    handleSearch = (event) => {
        this.setState({ valueSearch: event.target.value });
    };

    render() {
        const users = this.state.user;
        return (
            <div>
                {this.props.roleId !== 'R1' ? (
                    <Navigate to="/" />
                ) : (
                    <>
                        {this.state.isShowEditModal.type && (
                            <ModalEditUser
                                toggle={this.handleToggleEditModal}
                                isOpen={this.state.isShowEditModal.type}
                                user={this.state.isShowEditModal.user}
                                handleEditUser={this.handleEditUser}
                            ></ModalEditUser>
                        )}
                        <Button onClick={this.handleLoggout} small primary type="submit">
                            Logout
                        </Button>
                        <Button onClick={this.handleToggleCreateModal} small primary type="submit">
                            Create Doctor
                        </Button>
                        <ModalCreateUser
                            toggle={this.handleToggleCreateModal}
                            isShowModal={this.state.isShowCreateModal}
                            getUser={this.getUser}
                            handleCreateUser={this.handleCreateUser}
                            roleId="R2"
                        ></ModalCreateUser>
                        <InputGroup className="mb-3 mt-4">
                            <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                            <Form.Control
                                value={this.state.valueSearch}
                                onChange={(event) => {
                                    this.handleSearch(event);
                                }}
                                placeholder="Search"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <br></br>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.age}</td>
                                            <td>{user.roleData.roleId}</td>
                                            <td>
                                                <button
                                                    onClick={(e) => this.handleShowEditModal(user)}
                                                    className="btn btn-primary btn-custom"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => this.handleDeleteUser(user.id)}
                                                    className="btn btn-danger btn-custom"
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
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.token,
        roleId: state.roleId,
    };
};
const mapDispatchToProps = (dispatch) => {
    return { userLogoutSuccess: () => dispatch(userLogoutSuccess()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
