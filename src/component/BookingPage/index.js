import React, { Component } from 'react';
import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';

class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressClinic: '',
            date: '',
            doctorId: '',
            fullname: '',
            id: '',
            image: '',
            isBooking: '',
            isDoing: '',
            position: '',
            price: '',
            valueVi: '',
            timeType: '',
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        const location = this.props.location ? this.props.location : '';
        delete location.state.data.createdAt;
        delete location.state.data.updatedAt;
        this.setState({
            ...this.state,
            ...location.state.data,
        });
    };
    state = {};
    render() {
        console.log(this.state);
        return <h1>hi</h1>;
    }
}

export default withParamsAndNavigate(BookingPage);
