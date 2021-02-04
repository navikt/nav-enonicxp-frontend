import React from 'react';
import type { AppProps } from 'next/app';
import '../global.less';

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default App;
