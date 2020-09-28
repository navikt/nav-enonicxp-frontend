import Document, { Html, Head, Main, NextScript } from 'next/document';
import { fetchDecorator, paramsObjectToQueryString } from '../utils/fetch';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';
import React from 'react';

export type DecoratorFragments = {
    HEADER: string | null;
    FOOTER: string | null;
    SCRIPTS: string | null;
    STYLES: string | null;
};

type Props = {
    decoratorFragments: DecoratorFragments;
    isCSRDecorator?: boolean;
};

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        const params = {
            chatbot: true,
            breadcrumbs: [
                {
                    title: 'Laster innhold...',
                    url: '/',
                },
            ],
        };
        const query = paramsObjectToQueryString(params);
        const decoratorBody = await fetchDecorator(query);

        if (!decoratorBody) {
            const decoratorUrl = process.env.DECORATOR_URL;
            return {
                ...initialProps,
                decoratorFragments: {
                    HEADER: `<div id="decorator-header"></div>`,
                    STYLES: `<link href="${decoratorUrl}/css/client.css" rel="stylesheet" />`,
                    FOOTER: `<div id="decorator-footer"></div>`,
                    SCRIPTS: `<div id="decorator-env" data-src="${decoratorUrl}/env${query}"></div><script src="${decoratorUrl}/client.js"></script>`,
                },
                isCSRDecorator: true,
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

        return { ...initialProps, decoratorFragments, isCSRDecorator: false };
    }

    render() {
        const { decoratorFragments, isCSRDecorator } = this.props;
        const { HEADER, FOOTER, SCRIPTS, STYLES } = decoratorFragments;

        return (
            <Html>
                <Head>
                    {/* Legacy scripts */}
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
                    <script src="https://amplitude.nav.no/libs/amplitude-7.1.0-min.gz.js" />
                    {/* Legacy scripts */}
                    {STYLES && parse(STYLES)}
                </Head>
                <body>
                    <div
                        style={{ position: 'absolute', zIndex: 9999 }}
                    >{`Using CSR decorator?: ${isCSRDecorator}`}</div>
                    {HEADER && parse(HEADER)}
                    <Main />
                    {FOOTER && parse(FOOTER)}
                    {SCRIPTS && parse(SCRIPTS)}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
