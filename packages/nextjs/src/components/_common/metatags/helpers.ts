import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { trimIfString } from 'utils/string';
import { getPublicPathname, appOrigin } from 'utils/urls';

import { PageType } from './structuredData/types';

export const pageTypeLibrary: Partial<Record<ContentType, PageType>> = {
    [ContentType.FrontPage]: 'WebPage',
    [ContentType.FrontPageNested]: 'WebPage',
    [ContentType.ProductPage]: 'ItemPage',
    [ContentType.SectionPage]: 'CollectionPage',
    [ContentType.AreaPage]: 'CollectionPage',
    [ContentType.SituationPage]: 'CollectionPage',
    [ContentType.GuidePage]: 'FAQPage',
    [ContentType.Oversikt]: 'CollectionPage',
    [ContentType.OfficePage]: 'WebPage',
};

export const getContentTypeToStructure = (content: ContentProps): PageType | undefined => {
    return pageTypeLibrary[content.type];
};

export const getPageTitle = (content: ContentProps) =>
    `${content.data?.title || content.displayName} - nav.no`;

export const getDescription = (content: ContentProps, maxLength?: number) => {
    const description =
        trimIfString(content.data?.metaDescription) ||
        trimIfString(content.data?.ingress) ||
        trimIfString(content.data?.description) ||
        content.displayName;

    return description.slice(0, maxLength);
};

export const getCanonicalUrl = (content: ContentProps) => {
    return content.data?.canonicalUrl || `${appOrigin}${getPublicPathname(content)}`;
};

export const getSocialShareImageUrl = () => {
    return `${appOrigin}/gfx/social-share-fallback.png`;
};
