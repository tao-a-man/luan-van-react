import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
// Redux Persis
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';

// Router-Dom
import { BrowserRouter } from 'react-router-dom';

// Route
import Router from './Router';

// Tranlate
import IntlProviderWrapper from './hoc/IntlProviderWrapper';

// Style
import './style/styles.scss';
// Sevices
import appService from './services/appService';

const renderApp = () => {
    // test cron
    var CronJob = require('cron').CronJob;
    var job = new CronJob(
        '0 0 0 * * *',
        function () {
            // appService.runScheduleAutomatic();
        },
        null,
        false,
        'Asia/Ho_Chi_Minh',
    );
    ReactDOM.render(
        <Provider store={store}>
            {/* <PersistGate loading={<LoadingView />} persistor={persistor}> */}
            <PersistGate persistor={persistor}>
                <IntlProviderWrapper>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </IntlProviderWrapper>
            </PersistGate>
        </Provider>,
        document.getElementById('root'),
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
