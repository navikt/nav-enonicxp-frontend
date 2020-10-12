import React from 'react';
import { ContentTypeSchema } from '../../../../types/content-types/_schema';
import Head from 'next/head';
import {
    hasDescription,
    hasIngress,
    hasMetaDescription,
} from '../../../../types/content-types/_type-utils';

type Props = {
    content: ContentTypeSchema;
};

const descriptionMaxLength = 140;

const getDescription = (content: ContentTypeSchema) => {
    if (hasMetaDescription(content.data)) {
        // Meta description is set specifically for this purpose, so don't slice
        return content.data.metaDescription;
    }

    if (hasIngress(content.data)) {
        return content.data.ingress.slice(0, descriptionMaxLength);
    }

    if (hasDescription(content.data)) {
        return content.data.description.slice(0, descriptionMaxLength);
    }

    return null;
};

export const HeadWithMetaTags = ({ content }: Props) => {
    const description = getDescription(content);

    return (
        <Head>
            <title>{`${content.displayName} - nav.no`}</title>
            {description && <meta name="description" content={description} />}
        </Head>
    );
};
