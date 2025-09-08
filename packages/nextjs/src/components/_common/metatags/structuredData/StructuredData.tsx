import React from 'react';
import Head from 'next/head';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { generateJsonLd } from './json-ld-generator';

interface JsonLdScriptProps {
    content: ContentProps;
}

const structuredDataTypes = new Set([ContentType.ProductPage]);

export const StructuredData: React.FC<JsonLdScriptProps> = ({ content }) => {
    if (!structuredDataTypes.has(content.type)) {
        return null;
    }

    const jsonLdData = generateJsonLd(content);

    if (!jsonLdData) {
        return null;
    }

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdData, null, 0),
                }}
            />
        </Head>
    );
};
