import React, { useEffect } from 'react';
import { init as initApm } from '@nais/apm';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from 'store/store';
import { PageProps } from 'components/PageBase';

import 'global.scss';

// Browser telemetry (Grafana Faro, via @nais/apm). The collector is derived from the hostname: *.dev.nav.no sends to
// the dev collector, other *.nav.no hosts to prod. On localhost nothing is sent, and everything is echoed to the console.
const initTelemetry = () =>
    initApm({
        namespace: 'navno',
        app: 'nav-enonicxp-frontend',
        // The 12-character commit hash, which ties errors to a deploy
        version: process.env.BUILD_ID,
        // Each environment has its own build, so ENV is the right environment for this bundle. Separates dev1/dev2/dev3,
        // which all send to the same collector
        environment: process.env.ENV,
    });

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
    const isEditorView = !!pageProps?.content?.editorView;

    useEffect(() => {
        // Not in Content Studio's editor views. They're served from the XP admin host, outside nav.no, where @nais/apm
        // finds no collector and logs a misconfiguration error
        if (!isEditorView) {
            initTelemetry();
        }
    }, [isEditorView]);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
