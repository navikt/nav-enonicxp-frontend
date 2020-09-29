import React from 'react';
import type { AppProps } from 'next/app';
import '../global.less';

const App = ({ Component, pageProps }: AppProps) => {
    const { breadcrumbs } = pageProps;
    const styles = breadcrumbs?.length > 0 ? { marginTop: '2rem' } : undefined;

    return (
        <div className={'app'} style={styles}>
            <div className={'content-wrapper'} id={'maincontent'}>
                <Component {...pageProps} />
            </div>
        </div>
    );
};

export default App;
