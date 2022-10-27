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
import { getDecoratorComponents } from '../utils/decorator/decorator-utils-serverside';
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

        if (decoratorParams && ctx.res) {
            ctx.res.setHeader('DecoratorParams', decoratorParams);
        }

        const language = getDocumentParameter(
            initialProps,
            DocumentParameter.HtmlLang
        );

        const decoratorDisabled = getDocumentParameter(
            initialProps,
            DocumentParameter.DecoratorDisabled
        );

        const Decorator =
            !decoratorDisabled &&
            (await getDecoratorComponents(
                decoratorParams ? JSON.parse(decoratorParams) : undefined
            ));

        return {
            ...initialProps,
            Decorator,
            language,
        };
    }

    render() {
        const { Decorator, language } = this.props;

        return (
            <Html lang={language || 'no'}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
