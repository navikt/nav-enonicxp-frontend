import { ContentProps } from 'types/content-props/_content-common';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { getDescription, getPageTitle, pageTypeLibrary } from 'components/_common/metatags/helpers';
import { GraphEntity, PageType } from 'components/_common/metatags/structuredData/types';

type ReferenceConfig = {
    content: ContentProps;
    mainEntityOfPage?: string;
    mainEntity?: string;
};

const DEFAULT_PAGE_TYPE: PageType = 'WebPage';

export const generatePageEntity = ({ content }: ReferenceConfig): GraphEntity => {
    const pageType = pageTypeLibrary[content.type] ?? DEFAULT_PAGE_TYPE;
    const url = `${appOrigin}${getPublicPathname(content)}`;
    const organizationId = `${appOrigin}#organization`;
    const pageId = `${url}#page`;

    return {
        '@type': pageType,
        '@id': pageId,
        name: getPageTitle(content),
        description: getDescription(content),
        url,
        datePublished: content.publish?.first || content.createdTime,
        dateModified: content.modifiedTime,
        author: { '@id': organizationId },
        publisher: { '@id': organizationId },
    } as GraphEntity;
};
