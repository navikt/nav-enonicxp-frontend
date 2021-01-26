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
import {
    DecoratorFragments,
    getDecoratorFragments,
} from '../utils/decorator-utils';
import { objectToQueryString } from '../utils/fetch-utils';
import { decoratorParams404 } from '../components/pages/error-page/errorcode-content/Error404Content';
import { DocumentParameter } from '../components/_common/metatags/DocumentParameterMetatags';

type DocumentProps = {
    language: Language;
    decoratorFragments: DecoratorFragments;
};

const query404 = objectToQueryString(decoratorParams404);

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
// We use this to pass certain data from our page content via meta tags from the
// ServerSideOnlyMetatags component
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

        // 'pathname' in this context refers to the path of the
        // next.js route which handled the request
        const is404 = ctx.pathname === '/404';

        const decoratorQuery = is404
            ? query404
            : getDocumentParameter(
                  initialProps,
                  DocumentParameter.DecoratorQuery
              );

        const language = getDocumentParameter(
            initialProps,
            DocumentParameter.HtmlLang
        );

        const decoratorFragments = await getDecoratorFragments(decoratorQuery);

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
