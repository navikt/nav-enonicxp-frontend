import React from 'react';
import type { AppProps } from 'next/app';
import { JSDOM } from 'jsdom';
import WithDecorator, { DecoratorFragments } from '../components/WithDecorator';
import { fetchDecorator } from '../utils/fetch';
import '../global.less';
import { useRouter } from 'next/router';
import { FallbackPage } from '../components/page-components/fallback-page/FallbackPage';

type Props = {
    decoratorFragments: DecoratorFragments;
} & AppProps;

const App = (props: Props) => {
    const { Component, pageProps, decoratorFragments } = props;
    const router = useRouter();

    return (
        <WithDecorator fragments={decoratorFragments}>
            {router.isFallback ? (
                <FallbackPage />
            ) : (
                <div className={'app'}>
                    <div className={'content-wrapper'} id={'maincontent'}>
                        <Component {...pageProps} />
                    </div>
                </div>
            )}
        </WithDecorator>
    );
};

App.getInitialProps = async (ctx) => {
    // runs only on server
    if (ctx.ctx.req) {
        const decoratorBody = await fetchDecorator();

        if (!decoratorBody) {
            const decoratorUrl = process.env.DECORATOR_URL;
            return {
                decoratorFragments: {
                    HEADER: `<div id="decorator-header"></div>`,
                    STYLES: `<link href="${decoratorUrl}/css/client.css" rel="stylesheet" />`,
                    FOOTER: `<div id="decorator-footer"></div>`,
                    SCRIPTS: `<div id="decorator-env" data-src="${decoratorUrl}"></div><script src="${decoratorUrl}/client.js"></script>`,
                },
            };
        }

        const { document } = new JSDOM(decoratorBody).window;
        const prop = 'innerHTML';
        const decoratorFragments = {
            HEADER: document.getElementById('header-withmenu')[prop],
            STYLES: document.getElementById('styles')[prop],
            FOOTER: document.getElementById('footer-withmenu')[prop],
            SCRIPTS: document.getElementById('scripts')[prop],
        };

        return { decoratorFragments };
    }

    return {};
};

export default App;
