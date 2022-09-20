import React, { Component } from 'react';
import appService from '../../../services/appService';
import './HomeFooter.scss';

class HomeFooter extends Component {
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
            <div className="home-footer">
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

export default HomeFooter;
