import React from 'react';
import type { AppProps } from 'next/app';
import '../global.less';

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    return (
        <div className={'app'}>
            <Component {...pageProps} />
        </div>
    );
};

export default App;
