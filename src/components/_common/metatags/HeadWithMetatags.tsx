import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import Head from 'next/head';
import {
    hasCanonicalUrl,
    hasDescription,
    hasIngress,
    hasMetaDescription,
} from 'types/_type-guards';
import { appOrigin, getPublicPathname } from 'utils/urls';

type Props = {
    content: ContentProps;
    children?: React.ReactNode;
};

const descriptionMaxLength = 140;

const decoratorUrl = process.env.DECORATOR_URL;

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

const shouldNotIndex = (content: ContentProps) =>
    content.isPagePreview ||
    content.type === ContentType.Error ||
    content.type === ContentType.OfficeBranchPage || //Remove at launch
    content.data?.noindex;

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
    const title = getPageTitle(content);
    const description = getDescription(content).slice(0, descriptionMaxLength);
    const url = getCanonicalUrl(content);
    const noIndex = shouldNotIndex(content);
    const imageUrl = `${appOrigin}/gfx/social-share-fallback.png`;

    return (
        <Head>
            <title>{title}</title>
            {noIndex ? (
                <meta name={'robots'} content={'noindex, nofollow'} />
            ) : (
                <link rel={'canonical'} href={url} />
            )}
            <meta property={'og:title'} content={title} />
            <meta property={'og:site_name'} content={'nav.no'} />
            <meta property={'og:url'} content={url} />
            <meta property={'og:description'} content={description} />
            <meta property={'og:image'} content={imageUrl} />
            <meta property={'og:image:width'} content={'200'} />
            <meta property={'og:image:height'} content={'200'} />
            <meta name={'twitter:card'} content={'summary'} />
            <meta name={'twitter:domain'} content={'nav.no'} />
            <meta name={'twitter:title'} content={title} />
            <meta name={'twitter:description'} content={description} />
            <meta name={'twitter:image:src'} content={imageUrl} />
            <meta name={'description'} content={description} />
            <meta name={'contentId'} content={content._id} />
            <meta name={'msapplication-TileColor'} content={'#ffffff'} />
            <meta name={'theme-color'} content={'#ffffff'} />
            <link
                rel={'icon'}
                href={`${decoratorUrl}/media/favicon.ico`}
                sizes="any"
            />
            <link
                rel={'icon'}
                href={`${decoratorUrl}/media/favicon.svg`}
                type={'image/svg+xml'}
            />
            <link
                rel={'apple-touch-icon'}
                href={`${decoratorUrl}/media/apple-touch-icon.png`}
            />
            <link
                rel={'manifest'}
                href={`${decoratorUrl}/media/site.webmanifest`}
            />
            {children}
        </Head>
    );
};
