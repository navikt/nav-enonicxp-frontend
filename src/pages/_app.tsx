import React, { createContext, useContext } from 'react';
import type { AppProps } from 'next/app';
import { GlobalState } from '../components/PageBase';
import '../global.less';

const AppContext = createContext<GlobalState>({});

const App = ({ Component, pageProps }: AppProps) => {
    const { urlLookupTable } = pageProps;
    const globalState = {
        urlLookupTable,
    };

    return (
        <AppContext.Provider value={globalState}>
            <Component {...pageProps} />
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
}

export default App;
