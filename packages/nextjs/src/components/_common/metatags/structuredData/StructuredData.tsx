import React from 'react';
import Head from 'next/head';
import { ContentProps } from 'types/content-props/_content-common';
import { getContentTypeToStructure } from 'components/_common/metatags/helpers';
import { generateJsonLd } from './json-ld-generator';

interface JsonLdScriptProps {
    content: ContentProps;
}

export const StructuredData: React.FC<JsonLdScriptProps> = ({ content }) => {
    if (!getContentTypeToStructure(content)) {
        return null;
    }

    const jsonLdData = generateJsonLd(content);

    const shouldPrettyJson = process.env.ENV !== 'prod';

    console.log(shouldPrettyJson);

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdData, null, shouldPrettyJson ? 2 : 0),
                }}
            />
        </Head>
    );
};
