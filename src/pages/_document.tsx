import React from 'react';
import Document, { NextScript, DocumentContext } from 'next/document';
import { Html, Head, Main } from 'next/document';
import { getDecorator } from '../utils/decorator';
import { DecoratorFragments } from '../utils/decorator';

type Props = {
    decoratorFragments: DecoratorFragments;
};

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const decoratorFragments = await getDecorator(ctx);
        return {
            ...initialProps,
            decoratorFragments,
        };
    }

    render() {
        const { decoratorFragments } = this.props;
        const { HEADER, FOOTER, SCRIPTS, STYLES } = decoratorFragments;

        return (
            <Html>
                <Head>{STYLES}</Head>
                <body data-portal-component-type="page">
                    {HEADER}
                    <Main />
                    {FOOTER}
                    {SCRIPTS}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
