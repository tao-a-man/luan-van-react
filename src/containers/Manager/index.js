import React, { Component } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import Button from '../../component/Button';
import { userLogoutSuccess } from '../../store/actions';
import './Manager.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Manager extends Component {
    handleLoggout = () => {
        this.props.userLogoutSuccess();
    };

    render() {
        return (
            <div>
                {this.props.roleId !== 'R1' ? (
                    <Navigate to="/" />
                ) : (
                    <>
                        <Container fluid>
                            <Row>
                                <Col md={2} style={{ backgroundColor: '#d8d9e7', minHeight: '100vh' }}>
                                    <div className="wrap-logo">
                                        <div className="logo"></div>
                                        <span className="title">BookingCare</span>
                                    </div>
                                    <div className="dashboard">
                                        <FontAwesomeIcon className="me-1" icon="fa-solid fa-house-chimney" />
                                        <b>Dashboard</b>
                                    </div>
                                    <hr></hr>
                                    <div className="manager">
                                        <span className="mb-2">QUẢN LÝ</span>
                                        <NavLink
                                            to="/Manager/e"
                                            className={({ isActive }) => (isActive ? 'active link' : 'link')}
                                        >
                                            <FontAwesomeIcon className="me-1 w-25" icon="fa-solid fa-user-doctor" />
                                            Manager Doctor
                                        </NavLink>
                                        <NavLink
                                            to="/Manager/Specialist"
                                            className={({ isActive }) => (isActive ? 'active link' : 'link')}
                                        >
                                            <FontAwesomeIcon className="me-1 w-25" icon="fa-solid fa-hospital" />
                                            Manager Specialist
                                        </NavLink>
                                        <hr></hr>
                                        <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={this.handleLoggout}
                                            className="link"
                                        >
                                            <FontAwesomeIcon
                                                className="me-1 w-25"
                                                icon="fa-solid fa-right-from-bracket"
                                            />
                                            Logout
                                        </span>
                                    </div>
                                </Col>
                                <Col md={10}>
                                    <div className="header-admin">
                                        <div className="admin-title">
                                            <span className="mb-2">Admin, {this.props.firstName}!</span>
                                        </div>
                                    </div>
                                    <Outlet />
                                </Col>
                            </Row>
                        </Container>
                    </>
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        roleId: state.roleId,
        firstName: state.firstName,
    };
};
const mapDispatchToProps = (dispatch) => {
    return { userLogoutSuccess: () => dispatch(userLogoutSuccess()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
