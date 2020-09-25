import React from 'react';
import { AppProps } from 'next/app';
import '../global.less';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <div className={'app'}>
            <div className={'content-wrapper'} id={'maincontent'}>
                <Component {...pageProps} />
            </div>
        </div>
    );
};

export default App;
