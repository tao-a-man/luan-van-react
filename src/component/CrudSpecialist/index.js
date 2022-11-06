import React, { Component } from 'react';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import appService from '../../services/appService';

class CrudSpecialist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialist: [],
            isShowModalCreate: false,
            isShowModalEdit: false,
            infoSpecialist: {
                name: '',
                description: '',
            },
            infoSpecialistEdit: {
                id: '',
                name: '',
                description: '',
            },
        };
    }
    componentDidMount() {
        this.getSpecialist();
    }
    getSpecialist = async () => {
        const specialist = await appService.getSpecialist();
        this.setState({ specialist: specialist.specialist });
    };
    handleCloseModalCreate = () => {
        this.setState({
            isShowModalCreate: false,
            infoSpecialist: {
                name: '',
                description: '',
            },
        });
    };
    handleCloseModalEdit = () => {
        this.setState({ isShowModalEdit: false });
    };
    handleOpenModalCreate = () => {
        this.setState({ isShowModalCreate: true });
    };
    handleOpenModalEdit = (data) => {
        this.setState({
            isShowModalEdit: true,
            infoSpecialistEdit: { id: data.id, description: data.description, name: data.name },
        });
    };
    handleOnchangeCreate = (e) => {
        this.setState({
            ...this.state,
            infoSpecialist: { ...this.state.infoSpecialist, [e.target.name]: e.target.value },
        });
    };
    handleOnchangeEdit = (e) => {
        this.setState({
            ...this.state,
            infoSpecialistEdit: { ...this.state.infoSpecialistEdit, [e.target.name]: e.target.value },
        });
    };
    handleCreateSpecialist = async () => {
        const respon = await appService.postCreateSpecialist(this.state.infoSpecialist);
        this.getSpecialist();
        this.handleCloseModalCreate();
        if (respon.errCode === 0) {
            swal({
                title: 'Edit Specialist Success!',
                icon: 'success',
            });
        } else {
            swal({
                title: 'Error',
                text: respon.errMessage.errors[0].message,
                icon: 'error',
            });
        }
    };
    handleEditSpecialist = async () => {
        const respon = await appService.putEditSpecialist(this.state.infoSpecialistEdit);
        this.getSpecialist();
        this.handleCloseModalEdit();
        if (respon.errCode === 0) {
            swal({
                title: 'Edit Specialist Success!',
                icon: 'success',
            });
        } else {
            swal({
                title: 'Error',
                text: respon.errMessage.errors[0].message,
                icon: 'error',
            });
        }
    };
    handleDeleteSpecialist = async (id) => {
        const respon = await appService.deleteSpecialist(id);
        this.getSpecialist();
        if (respon.errCode === 0) {
            swal({
                title: 'Delete Specialist Success!',
                icon: 'success',
            });
        } else {
            swal({
                title: 'Error',
                text: respon.errMessage.errors[0].message,
                icon: 'error',
            });
        }
    };
    state = {};
    render() {
        return (
            <div>
                <button className="btn btn-primary mt-2" onClick={this.handleOpenModalCreate}>
                    Create Specialist
                </button>
                <br></br>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th width="2%">Id</th>
                            <th width="15%">Name</th>
                            <th width="63%">Description</th>
                            <th width="20%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.specialist.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button
                                            onClick={(e) => this.handleOpenModalEdit(item)}
                                            className="btn btn-primary btn-custom"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => this.handleDeleteSpecialist(item.id)}
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
                <Modal show={this.state.isShowModalCreate} onHide={this.handleCloseModalCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Specialist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                            <Form.Control
                                name="name"
                                value={this.state.infoSpecialist.name}
                                onChange={(e) => {
                                    this.handleOnchangeCreate(e);
                                }}
                                placeholder="Name Specialist"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                            <Form.Control
                                name="description"
                                value={this.state.infoSpecialist.description}
                                onChange={(e) => {
                                    this.handleOnchangeCreate(e);
                                }}
                                placeholder="Description"
                                aria-label="Description"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.handleCloseModalCreate}>
                            Close
                        </button>
                        <button className="btn btn-primary" onClick={this.handleCreateSpecialist}>
                            Create Specialist
                        </button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.isShowModalEdit} onHide={this.handleCloseModalEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Specialist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                            <Form.Control
                                name="name"
                                value={this.state.infoSpecialistEdit.name}
                                onChange={(e) => {
                                    this.handleOnchangeEdit(e);
                                }}
                                placeholder="Name Specialist"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                            <Form.Control
                                name="description"
                                value={this.state.infoSpecialistEdit.description}
                                onChange={(e) => {
                                    this.handleOnchangeEdit(e);
                                }}
                                placeholder="Description"
                                aria-label="Description"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.handleCloseModalEdit}>
                            Close
                        </button>
                        <button className="btn btn-primary" onClick={this.handleEditSpecialist}>
                            Edit Specialist
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CrudSpecialist;
