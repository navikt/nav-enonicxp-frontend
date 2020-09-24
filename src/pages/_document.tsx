import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class DocumentWithDecorator extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default DocumentWithDecorator;
