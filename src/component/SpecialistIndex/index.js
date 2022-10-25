import React, { Component } from 'react';
import { Outlet } from 'react-router';

class SpecialistIndex extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return <Outlet></Outlet>;
    }
}

export default SpecialistIndex;
