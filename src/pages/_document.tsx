import React from 'react';
import Document, { NextScript, DocumentContext } from 'next/document';
import { Html, Head, Main } from 'next/document';
import { DocumentProps, getDocumentProps } from '../utils/document-utils';

class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const { decoratorFragments, language } = await getDocumentProps(ctx);
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
