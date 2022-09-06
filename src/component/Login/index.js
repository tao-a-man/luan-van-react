import React, { Component } from 'react';
import userService from '../../services/userService';
import ModalCreateUser from '../ModalCreateUser';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

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
                this.props.userLoginSuccess(respon.token);
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
                {this.props.token !== null ? <Navigate to="/User" /> : ''}
                <ModalCreateUser isShowModal={this.state.isShowModal} toggle={this.toggle}></ModalCreateUser>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content">
                            <h1 className="login-title">Login</h1>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group input-group-lg">
                                    <div className="input-group-prepend">
                                        <span className="input-label">
                                            <i className="fas fa-user"></i>
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
                                            <i className="fas fa-lock"></i>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return { userLoginSuccess: (token) => dispatch(userLoginSuccess(token)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
