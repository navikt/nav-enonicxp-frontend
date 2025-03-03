import React from 'react';
import Head from 'next/head';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { trimIfString } from 'utils/string';

type Props = {
    content: ContentProps;
    children?: React.ReactNode;
};

const DESCRIPTION_MAX_LENGTH = 250;

const SOCIAL_SHARE_IMG_URL = `${appOrigin}/gfx/social-share-fallback.png`;

const getDescription = (content: ContentProps) => {
    const description =
        trimIfString(content.data?.metaDescription) ||
        trimIfString(content.data?.ingress) ||
        trimIfString(content.data?.description) ||
        content.displayName;

    return description.slice(0, DESCRIPTION_MAX_LENGTH);
};

const contentTypesWithNoIndex = new Set([ContentType.Error, ContentType.FormIntermediateStepPage]);

const isNoIndex = (content: ContentProps) =>
    content.isPagePreview || contentTypesWithNoIndex.has(content.type) || content.data?.noindex;

const getCanonicalUrl = (content: ContentProps) => {
    return content.data?.canonicalUrl || `${appOrigin}${getPublicPathname(content)}`;
};

export const getPageTitle = (content: ContentProps) =>
    `${content.data?.title || content.displayName} - nav.no`;

export const HeadWithMetatags = ({ content, children }: Props) => {
    const title = getPageTitle(content);
    const description = getDescription(content);
    const url = getCanonicalUrl(content);

    return (
        <Head>
            <title>{title}</title>
            {isNoIndex(content) ? (
                <meta name={'robots'} content={'noindex, nofollow'} />
            ) : (
                <link rel={'canonical'} href={url} />
            )}
            <meta property={'og:title'} content={title} />
            <meta property={'og:site_name'} content={'nav.no'} />
            <meta property={'og:url'} content={url} />
            <meta property={'og:description'} content={description} />
            <meta property={'og:image'} content={SOCIAL_SHARE_IMG_URL} />
            <meta property={'og:image:width'} content={'200'} />
            <meta property={'og:image:height'} content={'200'} />
            <meta name={'twitter:card'} content={'summary'} />
            <meta name={'twitter:domain'} content={'nav.no'} />
            <meta name={'twitter:title'} content={title} />
            <meta name={'twitter:description'} content={description} />
            <meta name={'twitter:image:src'} content={SOCIAL_SHARE_IMG_URL} />
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
