import React from 'react';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import Head from 'next/head';
import {
    hasCanonicalUrl,
    hasDescription,
    hasIngress,
    hasMetaDescription,
} from '../../../types/_type-guards';
import { appOrigin, stripXpPathPrefix } from '../../../utils/urls';

type Props = {
    content: ContentProps;
    children?: React.ReactNode;
};

const descriptionMaxLength = 140;

const getDescription = (content: ContentProps) => {
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

const getCanonicalUrl = (content: ContentProps) => {
    if (hasCanonicalUrl(content)) {
        return content.data.canonicalUrl;
    }

    const path = content.data?.customPath || stripXpPathPrefix(content._path);

    return `${appOrigin}${path}`;
};

export const HeadWithMetatags = ({ content, children }: Props) => {
    const title = `${content.displayName} - nav.no`;
    const description = getDescription(content).slice(0, descriptionMaxLength);
    const url = getCanonicalUrl(content);
    const imageUrl = `${appOrigin}/gfx/social-share-fallback.png`;
    const noIndex = content.data?.noindex;

    return (
        <Head>
            <title>{title}</title>
            {content.__typename !== ContentType.Error && !noIndex && (
                <link rel={'canonical'} href={url} />
            )}
            {noIndex && <meta name={'robots'} content={'noindex, nofollow'} />}
            <meta property={'og:title'} content={title} />
            <meta property={'og:site_name'} content={'nav.no'} />
            <meta property={'og:url'} content={url} />
            <meta property={'og:description'} content={description} />
            <meta property={'og:image'} content={imageUrl} />
            <meta property={'og:image:width'} content={'200'} />
            <meta property={'og:image:height'} content={'200'} />
            <meta name="twitter:card" content={'summary'} />
            <meta name="twitter:domain" content={'nav.no'} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image:src" content={imageUrl} />
            {children}
        </Head>
    );
};
