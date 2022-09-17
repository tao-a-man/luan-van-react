import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import App from '../containers/App';
import Manager from '../containers/Manager';
import Login from '../component/Login';
import Specialist from '../containers/Specialist';
import DeleteEditDoctor from '../component/DeleteEditDoctor';
import EditDetailDoctor from '../component/EditDetailDoctor';

class Router extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return (
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/Manager" element={<Manager />}>
                    <Route index element={<DeleteEditDoctor />}></Route>
                    <Route
                        path="/Manager/EditDetailDoctor/:id/:username/:fullname/:age"
                        element={<EditDetailDoctor />}
                    ></Route>
                </Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Specialist/:id" element={<Specialist />}></Route>
            </Routes>
        );
    }
}

export default Router;
