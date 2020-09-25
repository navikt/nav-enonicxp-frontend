import Document, { Html, Head, Main, NextScript } from 'next/document';
import { fetchDecorator } from '../utils/fetch';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';
import React from 'react';
import { DecoratorFragments } from '../components/WithDecorator';

const ParsedHtml = ({ html }: { html: string | null }) =>
    html ? <>{parse(html)}</> : null;

type Props = {
    decoratorFragments: DecoratorFragments;
};

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        const decoratorBody = await fetchDecorator();

        if (!decoratorBody) {
            const decoratorUrl = process.env.DECORATOR_URL;
            return {
                ...initialProps,
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

        return { ...initialProps, decoratorFragments };
    }

    render() {
        const {
            HEADER,
            FOOTER,
            SCRIPTS,
            STYLES,
        } = this.props.decoratorFragments;

        return (
            <Html>
                <Head>
                    <ParsedHtml html={STYLES} />
                </Head>
                <body>
                    <ParsedHtml html={HEADER} />
                    <Main />
                    <ParsedHtml html={FOOTER} />
                    <ParsedHtml html={SCRIPTS} />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
