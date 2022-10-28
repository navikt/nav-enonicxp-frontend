import React from 'react';
import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';
import { Language } from '../translations';
import { DocumentInitialProps } from 'next/dist/pages/_document';
import { DocumentParameter } from '../components/_common/metatags/DocumentParameterMetatags';
import { Components } from '@navikt/nav-dekoratoren-moduler/ssr';

type DocumentProps = {
    language: Language;
    Decorator: Components;
};

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
// We use this to pass certain data from our page content via meta tags from the
// DocumentParameterMetatags component
const getDocumentParameter = (
    initialProps: DocumentInitialProps,
    name: DocumentParameter
) => {
    return initialProps.head?.find((element) => element.props?.name === name)
        ?.props?.content;
};

class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        const decoratorParams = getDocumentParameter(
            initialProps,
            DocumentParameter.DecoratorParams
        );

        if (ctx.res) {
            ctx.res.setHeader(
                'decorator-params',
                Buffer.from(decoratorParams || '{}').toString('base64')
            );
        }

        const language = getDocumentParameter(
            initialProps,
            DocumentParameter.HtmlLang
        );

        return {
            ...initialProps,
            language,
        };
    }

    render() {
        const { language } = this.props;

        return (
            <Html lang={language || 'no'}>
                <Head>{'DECORATOR_STYLES'}</Head>
                <body>
                    {'DECORATOR_HEADER'}
                    <Main />
                    {'DECORATOR_FOOTER'}
                    {'DECORATOR_SCRIPTS'}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
