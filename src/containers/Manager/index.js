import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Button from '../../component/Button';
import { userLogoutSuccess } from '../../store/actions';

class Manager extends Component {
    constructor(props) {
        super(props);
    }

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
                        <Button className="ms-4" onClick={this.handleLoggout} navigate small type="submit">
                            Logout
                        </Button>
                        <Link to="/Manager">
                            <Button navigate small type="submit">
                                Manager Doctor
                            </Button>
                        </Link>
                        <Outlet></Outlet>
                    </>
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        roleId: state.roleId,
    };
};
const mapDispatchToProps = (dispatch) => {
    return { userLogoutSuccess: () => dispatch(userLogoutSuccess()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
