import React from 'react';
import type { AppProps } from 'next/app';
import { initializeFaro } from '@grafana/faro-web-sdk';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import 'global.scss';

initializeFaro({
    url: process.env.REACT_APP_TELEMETRY_URL,
    app: {
        name: 'nav-enonicxp-frontend',
        version: process.env.RELEASE_TAG,
    },
});

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
