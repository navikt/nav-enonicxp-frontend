import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { StructuredData } from 'components/_common/metatags/structuredData/StructuredData';
import { getCanonicalUrl, getDescription, getPageTitle, getSocialShareImageUrl } from './helpers';

type Props = PropsWithChildren<{
    content: ContentProps;
}>;

const DESCRIPTION_MAX_LENGTH = 250;

const contentTypesWithNoIndex = new Set([
    ContentType.Error,
    ContentType.FormIntermediateStepPage,
    ContentType.ContactStepPage,
]);

const isNoIndex = (content: ContentProps) =>
    content.isPagePreview || contentTypesWithNoIndex.has(content.type) || content.data?.noindex;

export const HeadWithMetatags = ({ content, children }: Props) => {
    const title = getPageTitle(content);
    const description = getDescription(content, DESCRIPTION_MAX_LENGTH);
    const url = getCanonicalUrl(content);
    const socialShareImageUrl = getSocialShareImageUrl();

    return (
        <>
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
                <meta property={'og:image'} content={socialShareImageUrl} />
                <meta property={'og:image:width'} content={'200'} />
                <meta property={'og:image:height'} content={'200'} />
                <meta name={'twitter:card'} content={'summary'} />
                <meta name={'twitter:domain'} content={'nav.no'} />
                <meta name={'twitter:title'} content={title} />
                <meta name={'twitter:description'} content={description} />
                <meta name={'twitter:image:src'} content={socialShareImageUrl} />
                <meta name={'description'} content={description} />
                <meta name={'contentId'} content={content._id} />
                {content.contentLayer && (
                    <meta name={'contentLayer'} content={content.contentLayer} />
                )}
                <meta name={'msapplication-TileColor'} content={'#ffffff'} />
                <meta name={'theme-color'} content={'#ffffff'} />
                <meta
                    name="google-site-verification"
                    content="svdLQanNMq_FTzsWHitPYTAvVASZp_KdWz3vQVMGt4Q"
                />
                {children}
            </Head>
            <StructuredData content={content} />
        </>
    );
};
