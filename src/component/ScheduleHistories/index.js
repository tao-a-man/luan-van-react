import React, { Component } from 'react';
import appService from '../../services/appService';
import { connect } from 'react-redux';

class ScheduleHistories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const data = await appService.getHistoryCare(this.props.token);
        this.setState({ data: data.data });
    };
    render() {
        console.log(this.state);
        return <div style={{ marginTop: '70px', backgroundColor: 'rgba(255,255,255,0.9)' }}>hi</div>;
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.token,
        roleId: state.roleId,
    };
};

export default connect(mapStateToProps, null)(ScheduleHistories);
