import React from 'react';
import ReactDOM from 'react-dom/client';

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

import appService from './services/appService';

// Style
import './style/styles.scss';
// Sevices
// import appService from './services/appService';

const renderApp = () => {
    // test cron
    var CronJob = require('cron').CronJob;
    var job = new CronJob(
        '0 56 21 * * *',
        function () {
            appService.runScheduleAutomatic();
        },
        null,
        true,
        'Asia/Ho_Chi_Minh',
    );
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
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
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
