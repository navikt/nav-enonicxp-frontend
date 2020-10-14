import React from 'react';
import Head from 'next/head';
import { enonicPathToUrl, getLocationOrigin } from '../../../../utils/paths';

type Props = {
    title: string;
    description: string;
    canonicalUrl: string;
    imageUrl?: string;
    children?: React.ReactNode;
};

const descriptionMaxLength = 140;

export const HeadWithMetatags = ({
    title,
    description,
    canonicalUrl,
    imageUrl,
    children,
}: Props) => {
    const _title = `${title} - nav.no`;
    const _description = description.slice(0, descriptionMaxLength);
    const _imageUrl =
        imageUrl || `${getLocationOrigin()}/gfx/social-share-fallback.png`;

    return (
        <Head>
            <title>{_title}</title>
            <meta name="description" content={_description} />
            <link rel={'canonical'} href={canonicalUrl} />
            <meta property={'og:title'} content={_title} />
            <meta property={'og:site_name'} content={'nav.no'} />
            <meta property={'og:url'} content={canonicalUrl} />
            <meta property={'og:description'} content={_description} />
            <meta property={'og:image'} content={_imageUrl} />
            <meta name="twitter:card" content={'summary_large_image'} />
            <meta name="twitter:domain" content={'nav.no'} />
            <meta name="twitter:title" content={_title} />
            <meta name="twitter:description" content={_description} />
            <meta name="twitter:image:src" content={_imageUrl} />
            {children}
        </Head>
    );
};
