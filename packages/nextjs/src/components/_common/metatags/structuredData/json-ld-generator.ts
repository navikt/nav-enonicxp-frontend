import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { appOrigin, getPublicPathname } from 'utils/urls';
import {
    getDescription,
    getPageTitle,
    getSocialShareImageUrl,
} from 'components/_common/metatags/helpers';
import { JsonLdData, PageType } from './types';

const pageTypeLibrary: Partial<Record<ContentType, PageType>> = {
    [ContentType.ProductPage]: 'ItemPage',
};

const DEFAULT_PAGE_TYPE: PageType = 'WebPage';

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
            '@type': 'GovernmentOrganization',
            name: 'Nav - Arbeids- og velferdsetaten',
            url,
            logo: {
                '@type': 'ImageObject',
                url: socialShareImageUrl,
            },
        },
        publisher: {
            '@type': 'GovernmentOrganization',
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
