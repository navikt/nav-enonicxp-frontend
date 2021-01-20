import React from 'react';
import Document, { NextScript, DocumentContext } from 'next/document';
import { Html, Head, Main } from 'next/document';
import { Language } from '../translations';
import { DocumentInitialProps } from 'next/dist/pages/_document';
import {
    DecoratorFragments,
    getDecoratorFragments,
} from '../utils/decorator-utils';

type DocumentProps = {
    language: Language;
    decoratorFragments: DecoratorFragments;
};

const decodeAndStripQueryFromPath = (path: string) =>
    decodeURI(path).split('?')[0];

const retrieveMetaContent = (
    initialProps: DocumentInitialProps,
    name: string
) => {
    return initialProps.head?.find((element) => element.props?.name === name)
        ?.props?.content;
};

class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        const decoratorQueryParams = retrieveMetaContent(
            initialProps,
            '_decoratorQuery'
        );

        const language = retrieveMetaContent(initialProps, '_htmlLang');

        const path = decodeAndStripQueryFromPath(ctx.asPath);
        const decoratorFragments = await getDecoratorFragments(
            path,
            decoratorQueryParams
        );

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
