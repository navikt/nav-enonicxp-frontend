import React from 'react';
import type { AppProps } from 'next/app';
import { getContentLanguages } from '../utils/languages';
import '../global.less';

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    const hasBreadcrumbsOrLanguageSelector =
        pageProps.content?.breadcrumbs?.length > 0 ||
        !!getContentLanguages(pageProps.content);

    return (
        <div
            className={`app${
                hasBreadcrumbsOrLanguageSelector ? ' app__offset' : ''
            }`}
        >
            <Component {...pageProps} />
        </div>
    );
};

export default App;
