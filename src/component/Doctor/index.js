import React, { Component } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import { userLogoutSuccess } from '../../store/actions';
import '../../containers/Manager/Manager.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Doctor extends Component {
    handleLoggout = () => {
        this.props.userLogoutSuccess();
    };

    render() {
        return (
            <div>
                {this.props.roleId !== 'R2' ? (
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
                                            to={`/Doctor/Schedule/${this.props.id}/${this.props.email}/${null}/${
                                                this.props.age
                                            }`}
                                            className={({ isActive }) => {
                                                return isActive ? 'active link' : 'link';
                                            }}
                                        >
                                            <FontAwesomeIcon className="me-1 w-25" icon="fa-solid fa-calendar-days" />
                                            Manager Schedule
                                        </NavLink>
                                        <NavLink
                                            to="/Doctor/Booking"
                                            className={({ isActive }) => {
                                                return isActive ? 'active link' : 'link';
                                            }}
                                        >
                                            <FontAwesomeIcon className="me-1 w-25" icon="fa-solid fa-folder-plus" />
                                            Manager Booking
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
                                            <span className="mb-2">Doctor, {this.props.firstName}!</span>
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
        lastName: state.lastName,
        age: state.age,
        email: state.email,
        id: state.id,
    };
};
const mapDispatchToProps = (dispatch) => {
    return { userLogoutSuccess: () => dispatch(userLogoutSuccess()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
