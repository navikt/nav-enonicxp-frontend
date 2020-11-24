import React from 'react';
import { ContentTypeProps } from '../../../types/content-props/_content-common';
import Head from 'next/head';
import {
    hasCanonicalUrl,
    hasDescription,
    hasIngress,
    hasMetaDescription,
} from '../../../types/_type-guards';
import { xpPathToUrl, getLocationOrigin } from '../../../utils/paths';

type Props = {
    content: ContentTypeProps;
    children?: React.ReactNode;
};

const descriptionMaxLength = 140;

const getDescription = (content: ContentTypeProps) => {
    if (hasMetaDescription(content)) {
        return content.data.metaDescription;
    }

    if (hasIngress(content)) {
        return content.data.ingress;
    }

    if (hasDescription(content)) {
        return content.data.description;
    }

    return content.displayName;
};

export const HeadWithMetatags = ({ content, children }: Props) => {
    const title = `${content.displayName} - nav.no`;
    const description = getDescription(content).slice(0, descriptionMaxLength);
    const url = xpPathToUrl(content._path);
    const canonicalUrl = hasCanonicalUrl(content.data)
        ? content.data.canonicalUrl
        : url;
    const imageUrl = `${getLocationOrigin()}/gfx/social-share-fallback.png`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel={'canonical'} href={canonicalUrl} />
            <meta property={'og:title'} content={title} />
            <meta property={'og:site_name'} content={'nav.no'} />
            <meta property={'og:url'} content={url} />
            <meta property={'og:description'} content={description} />
            <meta property={'og:image'} content={imageUrl} />
            <meta name="twitter:card" content={'summary_large_image'} />
            <meta name="twitter:domain" content={'nav.no'} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image:src" content={imageUrl} />
            {children}
        </Head>
    );
};
