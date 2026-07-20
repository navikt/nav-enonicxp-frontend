import React, { useEffect } from 'react';
import { initializeFaro } from '@grafana/faro-web-sdk';
import { Provider } from 'react-redux';
import { FlagProvider } from '@unleash/nextjs/client';
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

const unleashProxyUrl =
    typeof window === 'undefined'
        ? `${(process.env.APP_ORIGIN || 'http://localhost:3000').replace(/\/$/, '')}/api/unleash`
        : '/api/unleash';

const unleashProxyConfig = {
    url: unleashProxyUrl,
    refreshInterval: 10,
} as const;

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
    const isEditorView = !!pageProps?.content?.editorView;

    useEffect(() => {
        if (!isEditorView) {
            initFaro();
        }
    }, [isEditorView]);

    return (
        <Provider store={store}>
            <FlagProvider config={unleashProxyConfig}>
                <Component {...pageProps} />
            </FlagProvider>
        </Provider>
    );
};

export default App;
