import React from 'react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { DocumentInitialProps } from 'next/dist/pages/_document';
import { DecoratorComponentsReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import { getDecoratorComponents } from '@/shared/decorator-utils-serverside';
import { Language } from 'translations';
import { DocumentParameter } from 'components/_common/metatags/DocumentParameterMetatags';

type DocumentProps = {
    language: Language;
    Decorator: DecoratorComponentsReact;
    isLegacyContentType: boolean;
};

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
// We use this to pass certain data from our page content via meta tags from the
// DocumentParameterMetatags component
const getDocumentParameter = (initialProps: DocumentInitialProps, name: DocumentParameter) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content;
};

class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        const decoratorParams = getDocumentParameter(
            initialProps,
            DocumentParameter.DecoratorParams
        );

        const language = getDocumentParameter(initialProps, DocumentParameter.HtmlLang);

        const decoratorDisabled = getDocumentParameter(
            initialProps,
            DocumentParameter.DecoratorDisabled
        );

        const isLegacyContentType =
            getDocumentParameter(initialProps, DocumentParameter.LegacyContentType) === 'true';

        const Decorator =
            !decoratorDisabled &&
            (await getDecoratorComponents(
                decoratorParams ? JSON.parse(decoratorParams) : undefined
            ));

        return {
            ...initialProps,
            Decorator,
            language,
            isLegacyContentType,
        };
    }

    render() {
        const { Decorator, language, isLegacyContentType } = this.props;

        return (
            <Html lang={language || 'no'}>
                <Head>{Decorator && <Decorator.HeadAssets />}</Head>
                <body className={isLegacyContentType ? 'legacyContentType' : undefined}>
                    {Decorator && <Decorator.Header />}
                    <Main />
                    {Decorator && <Decorator.Footer />}
                    {Decorator && <Decorator.Scripts />}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
