import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const decoratorUrl = 'https://www.nav.no/dekoratoren';

class DocumentWithDecorator extends Document {
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx)
    //     return { ...initialProps }
    // }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href={`${decoratorUrl}/css/client.css`}
                        rel="stylesheet"
                    />
                </Head>
                <title>test</title>
                <body>
                    <section
                        id="decorator-header"
                        className="navno-dekorator"
                        role="main"
                    ></section>
                    <Main />
                    <NextScript />
                    <section
                        id="decorator-footer"
                        className="navno-dekorator"
                        role="main"
                    ></section>
                    <div
                        id="decorator-env"
                        data-src={`${decoratorUrl}/env`}
                    ></div>
                    <script src={`${decoratorUrl}/client.js`}></script>
                </body>
            </Html>
        );
    }
}

export default DocumentWithDecorator;
