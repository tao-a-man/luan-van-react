import React, { Component } from 'react';
import userService from '../../services/userService';
import ModalCreateUser from '../ModalCreateUser';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Login.scss';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            isShowModal: false,
        };
    }
    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleCreateUser = async (user) => {
        const respon = await userService.userServiceCreateUser(user);
        return respon;
    };

    handleOnClick = async () => {
        this.setState({
            errMessage: '',
        });

        try {
            const respon = await userService.userServiceLogin(this.state.email, this.state.password);
            if (respon && respon.errCode !== 0) {
                this.setState({
                    errMessage: respon.errMessage,
                });
            } else if (respon && respon.errCode == 0) {
                this.props.userLoginSuccess(respon);
            }
        } catch (err) {
            if (err.response.data) {
                this.setState({
                    errMessage: err.response.data.errMessage,
                });
            }
        }
    };
    toggle = () => {
        this.setState({ isShowModal: !this.state.isShowModal });
    };

    handleClickEye = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        return (
            <>
                {this.props.roleId === 'R1' ? <Navigate to="/Manager" /> : this.props.roleId ? <Navigate to="/" /> : ''}
                <ModalCreateUser
                    handleCreateUser={this.handleCreateUser}
                    isShowModal={this.state.isShowModal}
                    toggle={this.toggle}
                ></ModalCreateUser>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content">
                            <h1 className="login-title">Login</h1>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group input-group-lg">
                                    <div className="input-group-prepend">
                                        <span className="input-label">
                                            <FontAwesomeIcon icon="fa-solid fa-user" />
                                        </span>
                                    </div>
                                    <input
                                        className="login-input form-control"
                                        type="text"
                                        placeholder="Enter your email"
                                        value={this.state.email}
                                        onChange={(event) => {
                                            this.handleChangeEmail(event);
                                        }}
                                    />
                                </div>
                                <div className="input-group input-group-lg input-parent">
                                    <div className="input-group-prepend">
                                        <span className="input-label">
                                            <FontAwesomeIcon icon="fa-solid fa-lock" />
                                        </span>
                                    </div>
                                    <input
                                        className="login-input form-control"
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.handleChangePassword(event);
                                        }}
                                    />
                                    <i
                                        className={
                                            this.state.isShowPassword
                                                ? 'fas fa-eye hideAndShowPassword hideAndShowPassword'
                                                : 'fas fa-eye-slash hideAndShowPassword'
                                        }
                                        onClick={this.handleClickEye}
                                    ></i>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary btn-login" onClick={this.handleOnClick}>
                                Login
                            </button>
                            <span style={{ color: 'red' }}>{this.state.errMessage}</span>
                            <span className="register" onClick={() => this.setState({ isShowModal: true })}>
                                Register?
                            </span>
                        </div>
                    </div>
                </div>
            </>
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
    return {
        userLoginSuccess: (respon) => dispatch(userLoginSuccess(respon)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
