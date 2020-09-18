import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const decoratorUrl = process.env.DECORATOR_URL;

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
                <body>
                    <div
                        id="decorator-header"
                        className="navno-dekorator"
                        role="main"
                    />
                    <div className="app">
                        <Main />
                    </div>
                    <div
                        id="decorator-footer"
                        className="navno-dekorator"
                        role="main"
                    />
                    <div id="decorator-env" data-src={`${decoratorUrl}/env`} />
                    <script src={`${decoratorUrl}/client.js`} />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default DocumentWithDecorator;
