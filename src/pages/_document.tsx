import React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';
import { DecoratorFragments, getDecorator } from '../utils/fetch-decorator';
import { decoratorParams404 } from '../components/page-components/error-page/errorcode-content/Error404Content';
import { fetchBreadcrumbs, fetchLanguages } from '../utils/fetch-content';
import { appPathToXpPath } from '../utils/paths';

type Props = {
    decoratorFragments: DecoratorFragments;
    is404: boolean;
};

const decoratorParamsFromContext = async (ctx: DocumentContext) => {
    if (ctx.pathname === '/404') {
        return decoratorParams404;
    }

    const xpPath = appPathToXpPath(ctx.asPath);

    const [breadcrumbs, languages] = xpPath && [
        await fetchBreadcrumbs(xpPath),
        await fetchLanguages(xpPath),
    ];

    return {
        ...(breadcrumbs && { breadcrumbs }),
        ...(languages && { availableLanguages: languages }),
    };
};

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const decoratorParams = await decoratorParamsFromContext(ctx);
        const decoratorFragments = await getDecorator(decoratorParams);
        return {
            ...initialProps,
            decoratorFragments,
            is404: ctx.pathname === '/404',
        };
    }

    render() {
        const { decoratorFragments, is404 } = this.props;
        const { HEADER, FOOTER, SCRIPTS, STYLES } = decoratorFragments;

        return (
            <Html>
                <Head>
                    {/* Legacy scripts */}
                    <script
                        src={`${process.env.APP_ORIGIN}/legacy/scripts/jquery.min.js`}
                    />
                    {/* Legacy scripts */}
                    {/* Hide the context-element of breadcrumbs on the 404-page */}
                    {is404 && (
                        <style type={'text/css'}>
                            {
                                '.brodsmulesti li:nth-child(2):not(:last-child) {display: none;}'
                            }
                        </style>
                    )}
                    {STYLES}
                </Head>
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
