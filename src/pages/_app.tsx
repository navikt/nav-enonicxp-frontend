import React from 'react';
import type { AppProps } from 'next/app';
import '../global.less';

const App = ({ Component, pageProps }: AppProps) => {
    const styles = pageProps.breadcrumbs?.length && {
        marginTop: '2rem',
    };

    return (
        <div className={'app'} style={styles}>
            <div className={'content-wrapper'} id={'maincontent'}>
                <Component {...pageProps} />
            </div>
        </div>
    );
};

export default App;
