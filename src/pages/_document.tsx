import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';
import { fetchDecorator } from '../utils/fetch';

interface Decorator {
    HEADER: string;
    FOOTER: string;
    SCRIPTS: string;
    STYLES: string;
}

type Props = {
    decoratorFragments: Decorator;
};

class DocumentWithDecorator extends Document<Props> {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        const decoratorBody = await fetchDecorator();

        if (!decoratorBody) {
            return {
                ...initialProps,
                decoratorFragments: {
                    HEADER: null,
                    STYLES: null,
                    FOOTER: null,
                    SCRIPTS: null,
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
        const { decoratorFragments } = this.props;
        const { HEADER, STYLES, FOOTER, SCRIPTS } = decoratorFragments;

        return (
            <Html>
                <Head>{STYLES ? parse(STYLES) : null}</Head>
                <body>
                    {HEADER ? parse(HEADER) : null}
                    <div className="app">
                        <Main />
                    </div>
                    {FOOTER ? parse(FOOTER) : null}
                    {SCRIPTS ? parse(SCRIPTS) : null}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default DocumentWithDecorator;
