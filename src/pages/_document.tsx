import React from 'react';
import Document, { NextScript, DocumentContext } from 'next/document';
import { Html, Head, Main } from 'next/document';
import { getDecorator } from '../utils/fetch-decorator';
import { DecoratorFragments, DecoratorParams } from '../utils/fetch-decorator';
import { decoratorParams404 } from '../components/page-components/error-page/errorcode-content/Error404Content';
import { fetchBreadcrumbs, fetchLanguages } from '../utils/fetch-content';
import { appPathToXpPath } from '../utils/paths';
import dotenv from 'dotenv';

type Props = {
    decoratorFragments: DecoratorFragments;
};

const decoratorParamsFromContext = async (
    ctx: DocumentContext
): Promise<DecoratorParams> => {
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
        if (process.env.NODE_ENV === 'production') {
            dotenv.config({ path: '/var/run/secrets/nais.io/vault/.env' });
        }

        const initialProps = await Document.getInitialProps(ctx);
        const decoratorParams = await decoratorParamsFromContext(ctx);
        const decoratorFragments = await getDecorator(decoratorParams);
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
                <Head>
                    {/* Legacy scripts */}
                    <script
                        src={`${process.env.APP_ORIGIN}/legacy/scripts/jquery.min.js`}
                    />
                    {/* Legacy scripts */}
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
