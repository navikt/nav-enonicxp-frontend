import React from 'react';
import type { AppProps } from 'next/app';
import { JSDOM } from 'jsdom';
import WithDecorator, { DecoratorFragments } from '../components/WithDecorator';
import { fetchDecorator } from '../utils/fetch';
import '../global.less';

type Props = {
    decoratorFragments: DecoratorFragments;
} & AppProps;

const App = (props: Props) => {
    const { Component, pageProps, decoratorFragments } = props;

    return (
        <WithDecorator fragments={decoratorFragments}>
            <div className={'app'}>
                <div className={'content-wrapper'} id={'maincontent'}>
                    <Component {...pageProps} />
                </div>
            </div>
        </WithDecorator>
    );
};

App.getInitialProps = async (ctx) => {
    // runs only on server
    if (ctx.ctx.req) {
        const decoratorUrlEnv = process.env.DECORATOR_ENV_URL;
        const decoratorUrlProd = process.env.DECORATOR_PROD_URL;

        const decoratorFragments = !process.env.GITHUB_BUILD
            ? await getDecoratorFragments(decoratorUrlEnv)
            : await getDecoratorFragments(decoratorUrlProd);

        return { decoratorFragments };
    }

    return {};
};

const getDecoratorFragments = async (url: string) => {
    const body = await fetchDecorator(url);
    if (!body) return false;
    const { document } = new JSDOM(body).window;
    const prop = 'innerHTML';
    return {
        HEADER: document.getElementById('header-withmenu')[prop],
        STYLES: document.getElementById('styles')[prop],
        FOOTER: document.getElementById('footer-withmenu')[prop],
        SCRIPTS: document.getElementById('scripts')[prop],
    };
};

export default App;
