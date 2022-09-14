import React, { Component } from 'react';
import appService from '../../../services/appService';
import './HomeContent.scss';

class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state = { commodities: [] };
    }
    async componentDidMount() {
        const commodities = await appService.getCommodities();
        this.setState({ commodities: commodities.commodities });
    }
    render() {
        return (
            <div className="home-content">
                <div className="home-content-title">
                    <span className="title">Nền tảng y tế chăm sóc sức khỏe toàn diện</span>
                    <span className="sub-title">Uy tín - Tận tâm - Chất lượng</span>
                </div>
                <div className="home-option">
                    {this.state.commodities.map((item) => {
                        return (
                            <div className="item">
                                <i className="fas fa-hospital"></i>
                                <h3>{item.name}</h3>
                                <p>Thiết bị {item.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default HomeContent;
