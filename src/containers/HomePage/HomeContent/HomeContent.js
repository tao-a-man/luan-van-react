import React, { Component } from 'react';
import './HomeContent.scss';

class HomeContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="home-content">
                <div className="home-content-title">
                    <span className="title">Nền tảng y tế chăm sóc sức khỏe toàn diện</span>
                    <span className="sub-title">Uy tín - Tận tâm - Chất lượng</span>
                </div>
            </div>
        );
    }
}

export default HomeContent;
