import React, { Component } from 'react';
import './HomeContent.scss';

class HomeContent extends Component {
    render() {
        return (
            <div className="home-content">
                <div className="home-content-title">
                    <span className="title">Nền tảng y tế chăm sóc sức khỏe toàn diện</span>
                    <span className="sub-title">Uy tín - Tận tâm - Chất lượng</span>
                </div>
                <div className="home-option">
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeContent;
