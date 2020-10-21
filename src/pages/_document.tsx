import React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';
import { DecoratorFragments, getDecorator } from '../utils/fetch-decorator';

type Props = {
    decoratorFragments: DecoratorFragments;
};

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext) {
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
                    <script src="/legacy/scripts/jquery.min.js" />
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
