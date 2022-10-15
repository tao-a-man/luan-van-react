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
import CrudDoctor from '../component/CrudDoctor';
import DetailDoctor from '../component/DetailDoctor';
import Doctor from '../component/Doctor';

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
                    <Route path="/DetailDoctor" element={<DetailDoctor />}></Route>
                </Route>
                <Route path="/Manager" element={<Manager />}>
                    <Route path="/Manager/CrudDoctor" element={<CrudDoctor />}>
                        <Route index element={<DeleteEditDoctor />} />
                        <Route
                            path="/Manager/CrudDoctor/EditDetailDoctor/:id/:username/:fullname/:age"
                            element={<EditDetailDoctor />}
                        ></Route>
                        <Route
                            path="/Manager/CrudDoctor/ScheduleDoctor/:id/:username/:fullname/:age"
                            element={<Schedule />}
                        />
                    </Route>
                    <Route path="/Manager/Specialist" element={<CrudSpecialist />} />
                </Route>
                <Route path="/Doctor" element={<Doctor />}>
                    <Route path="/Doctor/Schedule/:id/:username/:fullname/:age" element={<Schedule />} />
                    <Route path="/Doctor/Booking" element={<SchedulePatient />} />
                </Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/DGTest" element={<Gdtest />}></Route>
            </Routes>
        );
    }
}

export default Router;
