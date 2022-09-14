import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './HomePage.scss';
import HomeHeader from './HomeHeader/HomeHeader';
import HomeContent from './HomeContent/HomeContent';

class HomePage extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="home-page">
                {this.props.roleId === 'R1' ? <Navigate to="/Manager"></Navigate> : ''}
                <HomeHeader />
                <HomeContent />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    roleId: state.roleId,
});

export default connect(mapStateToProps, null)(HomePage);
