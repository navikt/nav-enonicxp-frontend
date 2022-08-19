import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import 'global.scss';
import { useRouter } from 'next/router';

// 18/08/22: In relation with quick fix for checking if browser is
// safari before calling navigate on beforePopState.
declare global {
    interface Window {
        safari: any;
    }
}

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const pageShowHandler = (event: PageTransitionEvent) => {
        console.log('page is shown from bfcache');
        if (window.safari && event.persisted) {
            router.reload();
            event.preventDefault();
            event.stopPropagation();
        }
    };

    useEffect(() => {
        window.addEventListener('pageshow', pageShowHandler);

        return () => {
            window.removeEventListener('pageshow', pageShowHandler);
        };
    }, []);
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
