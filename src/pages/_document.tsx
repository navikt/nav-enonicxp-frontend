import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const decoratorUrl = process.env.DECORATOR_URL;

class DocumentWithDecorator extends Document {
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
                    <div
                        id="decorator-env"
                        data-src={`${decoratorUrl}/env?chatbot=true`}
                    />
                    <script src={`${decoratorUrl}/client.js`} />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default DocumentWithDecorator;
