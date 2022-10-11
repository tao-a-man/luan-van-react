import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import App from '../containers/App';
import Manager from '../containers/Manager';
import Login from '../component/Login';
import Specialist from '../containers/Specialist';
import DeleteEditDoctor from '../component/DeleteEditDoctor';
import EditDetailDoctor from '../component/EditDetailDoctor';
import HomeContent from '../containers/HomePage/HomeContent/HomeContent';
import CrudSpecialist from '../component/CrudSpecialist';
import Schedule from '../component/Schedule';
import Gdtest from '../component/GDTEST';
import BookingPage from '../component/BookingPage';
import SchedulePatient from '../component/SchedulePatient';

class Router extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return (
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomeContent />} />
                    <Route path="/Specialist/:id" element={<Specialist />}></Route>
                    <Route path="/Booking" element={<BookingPage />}></Route>
                    <Route path="/SchedulePatient" element={<SchedulePatient />}></Route>
                </Route>
                <Route path="/Manager" element={<Manager />}>
                    <Route index element={<DeleteEditDoctor />}></Route>
                    <Route
                        path="/Manager/EditDetailDoctor/:id/:username/:fullname/:age"
                        element={<EditDetailDoctor />}
                    ></Route>
                    <Route path="/Manager/Specialist" element={<CrudSpecialist />} />
                    <Route path="/Manager/ScheduleDoctor/:id/:username/:fullname/:age" element={<Schedule />} />
                </Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/DGTest" element={<Gdtest />}></Route>
            </Routes>
        );
    }
}

export default Router;
