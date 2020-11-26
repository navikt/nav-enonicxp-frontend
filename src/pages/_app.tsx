import React from 'react';
import type { AppProps } from 'next/app';
import '../global.less';

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    const styles = {
        ...(pageProps.breadcrumbs?.length && {
            paddingTop: '1rem',
        }),
    };
    return (
        <div className={'app'} style={styles}>
            <Component {...pageProps} />
        </div>
    );
};

export default App;
