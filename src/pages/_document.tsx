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
            STYLES,
            FOOTER,
            SCRIPTS,
        } = this.props.decoratorFragments;

        return (
            <Html>
                <Head>{STYLES ? parse(STYLES) : null}</Head>
                <body>
                    {HEADER ? parse(HEADER) : null}
                    <Main />
                    {FOOTER ? parse(FOOTER) : null}
                    {SCRIPTS &&
                        parse(SCRIPTS, {
                            replace: ({ type, attribs }) => {
                                if (typeof document !== 'undefined') {
                                    if (type === 'script') {
                                        const script = document.createElement(
                                            'script'
                                        );
                                        script.src = attribs.src;
                                        document.head.appendChild(script);
                                    }
                                }
                            },
                        })}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default DocumentWithDecorator;
