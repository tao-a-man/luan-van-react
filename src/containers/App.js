import React, { Component } from 'react';
import Login from '../component/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Login />
            </>
        );
    }
}
export default App;
