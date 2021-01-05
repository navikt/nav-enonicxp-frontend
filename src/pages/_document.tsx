import React from 'react';
import Document, { NextScript, DocumentContext } from 'next/document';
import { Html, Head, Main } from 'next/document';
import { getDecorator, paramsFromContext } from '../utils/document-utils';
import { DecoratorFragments } from '../utils/document-utils';
import { Language } from '../translations';

type Props = {
    decoratorFragments: DecoratorFragments;
    language: Language;
};

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const { decoratorParams, language } = await paramsFromContext(ctx);
        const decoratorFragments = await getDecorator(decoratorParams);
        return {
            ...initialProps,
            decoratorFragments,
            language,
        };
    }

    render() {
        const { decoratorFragments, language } = this.props;
        const { HEADER, FOOTER, SCRIPTS, STYLES } = decoratorFragments;

        return (
            <Html lang={language || 'no'}>
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
