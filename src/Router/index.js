import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import App from '../containers/App';
import User from '../containers/User';

class Router extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return (
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/User" element={<User />}></Route>
            </Routes>
        );
    }
}

export default Router;
