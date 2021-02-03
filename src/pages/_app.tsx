import React, { createContext, useContext } from 'react';
import type { AppProps } from 'next/app';
import { PageProps } from '../components/PageBase';
import '../global.less';

const AppContext = createContext<PageProps>({ content: undefined });

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <AppContext.Provider value={pageProps}>
            <Component {...pageProps} />
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
}

export default App;
