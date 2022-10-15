import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import './HomePage.scss';
import HomeHeader from './HomeHeader/HomeHeader';
import HomeFooter from './HomeFooter/HomeFooter';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                {this.props.roleId === 'R1' ? (
                    <Navigate to="/Manager" />
                ) : this.props.roleId === 'R2' ? (
                    <Navigate to="/Doctor" />
                ) : (
                    ''
                )}
                <HomeHeader />
                <Outlet></Outlet>
                <HomeFooter />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    roleId: state.roleId,
});

export default connect(mapStateToProps, null)(HomePage);
