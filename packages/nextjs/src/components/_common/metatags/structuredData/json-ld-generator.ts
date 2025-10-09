import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { appOrigin, getPublicPathname } from 'utils/urls';
import {
    getDescription,
    getPageTitle,
    getSocialShareImageUrl,
    pageTypeLibrary,
} from 'components/_common/metatags/helpers';
import { GraphEntity, JsonLdData, PageType } from './types';

type ReferenceConfig = {
    content: ContentProps;
    mainEntityOfPage?: string;
    mainEntity?: string;
};

const DEFAULT_PAGE_TYPE: PageType = 'WebPage';

const generateOfficeBranchEntity = ({ content }: ReferenceConfig): GraphEntity => {
    const url = `${appOrigin}${getPublicPathname(content)}`;

    const organizationId = `${appOrigin}#organization`;
    const officeId = `${url}#office`;

    return {
        '@type': 'GovernmentOffice',
        '@id': officeId,
        name: getPageTitle(content),
        parentOrganization: { '@id': organizationId },
    };
};

const generateImageObjectEntity = () => {
    const logoId = `${appOrigin}#logo`;
    const socialShareImageUrl = getSocialShareImageUrl();

    return {
        '@type': 'ImageObject',
        '@id': logoId,
        url: socialShareImageUrl,
    };
};

const generatePageEntity = ({ content }: ReferenceConfig): GraphEntity => {
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
    };
};

const generateGraph = (graphEntities: GraphEntity[]): JsonLdData => {
    return {
        '@context': 'https://schema.org',
        '@graph': graphEntities,
    };
};

export const generateJsonLd = (content: ContentProps): JsonLdData | null => {
    const pageEntity = generatePageEntity({
        content,
    });
    const imageEntity = generateImageObjectEntity();

    const officeBranchEntity =
        content.type === ContentType.OfficePage ? generateOfficeBranchEntity({ content }) : null;

    const baseGraph = generateGraph(
        [pageEntity, imageEntity, officeBranchEntity].filter(Boolean) as GraphEntity[]
    );

    return baseGraph;
};
