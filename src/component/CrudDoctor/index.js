import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

class CrudDoctor extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return <Outlet></Outlet>;
    }
}

export default CrudDoctor;
