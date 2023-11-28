import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { initializeFaro } from '@grafana/faro-web-sdk';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { PageProps } from 'components/PageBase';

import 'global.scss';

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
    useEffect(() => {
        if (pageProps?.content?.editorView) {
            return;
        }

        initializeFaro({
            url: process.env.TELEMETRY_URL,
            app: {
                name: 'nav-enonicxp-frontend',
                version: process.env.RELEASE_TAG,
            },
        });
    }, []);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
