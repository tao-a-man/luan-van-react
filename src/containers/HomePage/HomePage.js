import React, { Component } from 'react';

import './HomePage.scss';
import HomeHeader from './HomeHeader/HomeHeader';
import HomeContent from './HomeContent/HomeContent';
import HomeSection from './HomeSection/HomeSection';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <HomeHeader />
                <HomeContent />
            </div>
        );
    }
}

export default HomePage;
