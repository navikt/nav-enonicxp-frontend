import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { DecoratorFragments, getDecorator } from '../utils/fetchDecorator';

type Props = {
    decoratorFragments: DecoratorFragments;
};

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        const decoratorFragments = await getDecorator();
        return { ...initialProps, decoratorFragments };
    }

    render() {
        const { decoratorFragments } = this.props;
        const { HEADER, FOOTER, SCRIPTS, STYLES } = decoratorFragments;

        return (
            <Html>
                <Head>
                    {/* Legacy scripts */}
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
                    <script src="https://amplitude.nav.no/libs/amplitude-7.1.0-min.gz.js" />
                    {/* Legacy scripts */}
                    {STYLES}
                </Head>
                <body>
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
