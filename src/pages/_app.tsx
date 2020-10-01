import React from 'react';
import type { AppProps } from 'next/app';
import '../global.less';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <div className={'app'} data-portal-region="main" data-th-remove="tag">
            <Component {...pageProps} />
        </div>
    );
};

export default App;
