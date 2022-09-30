import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';

import HomePage from './HomePage/HomePage';

library.add(far, fas, faTwitter, faFontAwesome);

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <HomePage />
            </>
        );
    }
}
export default App;
