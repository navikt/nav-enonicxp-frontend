import React, { useEffect } from 'react';
import { initializeFaro } from '@grafana/faro-web-sdk';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from 'store/store';
import { PageProps } from 'components/PageBase';

import 'global.scss';

const initFaro =
    process.env.ENV === 'localhost'
        ? () => {}
        : () =>
              initializeFaro({
                  url: process.env.TELEMETRY_URL,
                  app: {
                      name: 'nav-enonicxp-frontend',
                      version: process.env.RELEASE_TAG,
                  },
              });

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
    const isEditorView = !!pageProps?.content?.editorView;

    useEffect(() => {
        if (!isEditorView) {
            initFaro();
        }
    }, [isEditorView]);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
