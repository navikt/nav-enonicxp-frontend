import React from 'react';
import type { AppProps } from 'next/app';
import '../global.less';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <div className={'content-wrapper'} id={'maincontent'}>
            <Component {...pageProps} />
        </div>
    );
};

export default MyApp;
