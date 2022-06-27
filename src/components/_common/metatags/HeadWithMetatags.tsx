import React from 'react';
import { NextRouter, useRouter } from 'next/router';
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
import {
    appOrigin,
    getPublicPathname,
    stripXpPathPrefix,
} from '../../../utils/urls';

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

const shouldNotIndex = (content: ContentProps, router: NextRouter) => {
    if (router.query.utkastRouter) {
        return true;
    }
    return content.data?.noindex;
};

const getCanonicalUrl = (content: ContentProps) => {
    if (hasCanonicalUrl(content)) {
        return content.data.canonicalUrl;
    }

    const path = getPublicPathname(content);

    return `${appOrigin}${path}`;
};

export const getPageTitle = (content: ContentProps) =>
    `${content.displayName} - nav.no`;

export const HeadWithMetatags = ({ content, children }: Props) => {
    const router = useRouter();

    const title = getPageTitle(content);
    const description = getDescription(content).slice(0, descriptionMaxLength);
    const url = getCanonicalUrl(content);
    const noIndex = shouldNotIndex(content, router);
    const imageUrl = `${appOrigin}/gfx/social-share-fallback.png`;

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
            <meta name="description" content={description} />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png?v=2"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png?v=2"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png?v=2"
            />
            <link rel="manifest" href="/site.webmanifest?v=2" />
            <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg?v=2"
                color="#de2e2e"
            />
            <link rel="shortcut icon" href="/favicon.ico?v=2" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#ffffff" />
            {children}
        </Head>
    );
};
