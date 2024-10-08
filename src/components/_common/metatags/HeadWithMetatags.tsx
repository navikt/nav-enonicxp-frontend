import React from 'react';
import Head from 'next/head';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
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

const descriptionMaxLength = 250;

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
    content.isPagePreview || content.type === ContentType.Error || content.data?.noindex;

const getCanonicalUrl = (content: ContentProps) => {
    if (hasCanonicalUrl(content)) {
        return content.data.canonicalUrl;
    }

    const path = getPublicPathname({ _path: content._path });

    return `${appOrigin}${path}`;
};

export const getPageTitle = (content: ContentProps) =>
    `${content.data?.title || content.displayName} - nav.no`;

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
            {content.contentLayer && <meta name={'contentLayer'} content={content.contentLayer} />}
            <meta name={'msapplication-TileColor'} content={'#ffffff'} />
            <meta name={'theme-color'} content={'#ffffff'} />
            <meta
                name="google-site-verification"
                content="svdLQanNMq_FTzsWHitPYTAvVASZp_KdWz3vQVMGt4Q"
            />
            {children}
        </Head>
    );
};
