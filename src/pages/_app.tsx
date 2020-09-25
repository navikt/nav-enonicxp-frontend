import React from 'react';
import type { AppProps } from 'next/app';
import { JSDOM } from 'jsdom';
import WithDecorator, { DecoratorFragments } from '../components/WithDecorator';
import {
    fetchDecorator,
    fetchPage,
    paramsObjectToQueryString,
} from '../utils/fetch';
import '../global.less';
import { enonicPathToUrl, routerQueryToEnonicPath } from '../utils/paths';

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
        // TODO: finn en måte å få denne informasjonen uten et nytt kall til enonic...
        const enonicPath = routerQueryToEnonicPath(
            ctx.router.query.pathRouter || ''
        );
        const content = await fetchPage(enonicPath);

        const params = {
            chatbot: true,
            breadcrumbs: [
                {
                    title: content?.displayName || ' ',
                    url: enonicPathToUrl(content?._path),
                },
            ],
        };
        const query = paramsObjectToQueryString(params);
        const decoratorBody = await fetchDecorator(query);

        if (!decoratorBody) {
            const decoratorUrl = process.env.DECORATOR_URL;
            return {
                decoratorFragments: {
                    HEADER: `<div id="decorator-header"></div>`,
                    STYLES: `<link href="${decoratorUrl}/css/client.css" rel="stylesheet" />`,
                    FOOTER: `<div id="decorator-footer"></div>`,
                    SCRIPTS: `<div id="decorator-env" data-src="${decoratorUrl}/env${query}"><script src="${decoratorUrl}/client.js"></script>`,
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
