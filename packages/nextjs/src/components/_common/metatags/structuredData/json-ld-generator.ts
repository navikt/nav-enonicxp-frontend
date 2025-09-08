import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { getPageTitle, getSocialShareImageUrl } from 'components/_common/metatags/helpers';
import { JsonLdData, PageType } from './types';

const pageTypeLibrary: Partial<Record<ContentType, PageType>> = {
    [ContentType.ProductPage]: 'ItemPage',
};

const DEFAULT_PAGE_TYPE: PageType = 'WebPage';

const getDescription = (content: ContentProps): string => {
    const data = content.data;

    return (
        data?.metaDescription ||
        data?.ingress ||
        data?.description ||
        content.displayName ||
        'Nav - Informasjon og tjenester fra Arbeids- og velferdsetaten' // Fallback hvis ingen andre et tilgjengelig
    );
};

const generateBaseJsonLd = (content: ContentProps, type: PageType): JsonLdData => {
    const url = `${appOrigin}${getPublicPathname(content)}`;
    const socialShareImageUrl = getSocialShareImageUrl();

    return {
        '@context': 'https://schema.org',
        '@type': type,
        name: getPageTitle(content),
        description: getDescription(content),
        url,
        datePublished: content.publish?.first || content.createdTime,
        dateModified: content.modifiedTime,
        author: {
            '@type': 'Organization',
            name: 'Nav - Arbeids- og velferdsetaten',
            url,
            logo: {
                '@type': 'ImageObject',
                url: socialShareImageUrl,
            },
        },
        publisher: {
            '@type': 'Organization',
            name: 'Nav - Arbeids- og velferdsetaten',
            url,
            logo: {
                '@type': 'ImageObject',
                url: socialShareImageUrl,
            },
        },
    };
};

export const generateJsonLd = (content: ContentProps): JsonLdData | null => {
    const pageType = pageTypeLibrary[content.type] ?? DEFAULT_PAGE_TYPE;

    const jsonLdData = generateBaseJsonLd(content, pageType);

    return jsonLdData;
};
