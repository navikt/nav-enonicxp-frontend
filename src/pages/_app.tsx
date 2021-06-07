import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import '../global.less';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
