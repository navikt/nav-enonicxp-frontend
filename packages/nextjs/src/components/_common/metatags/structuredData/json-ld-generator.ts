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

const generateOrganizationEntity = (): GraphEntity => {
    const organizationId = `${appOrigin}#organization`;
    const logoId = `${appOrigin}#logo`;

    return {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Nav - Arbeids- og velferdsetaten',
        url: appOrigin,
        logo: { '@id': logoId },
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
    } as GraphEntity;
};

const generateGraph = (graphEntities: GraphEntity[]): JsonLdData => {
    return {
        '@context': 'https://schema.org',
        '@graph': graphEntities,
    };
};

const createReferencesBetweenEntities = (entities: GraphEntity[]): GraphEntity[] => {
    // Create lookup maps for efficient access
    const entityById = new Map<string, GraphEntity>();
    const entitiesByType = new Map<string, GraphEntity[]>();

    entities.forEach((entity) => {
        entityById.set(entity['@id'], entity);

        const type = entity['@type'];

        // Multiple entities can share the same type, so need
        // to store them in an array
        const entityByTypeArray = entitiesByType.get(type) ?? [];
        entitiesByType.set(type, [...entityByTypeArray, entity]);
    });

    // Helper to find first entity of a specific type
    const findEntityByType = (type: string): GraphEntity | undefined => {
        return entitiesByType.get(type)?.[0];
    };

    // Apply reference rules
    return entities.map((entity) => {
        if (!entity || typeof entity !== 'object' || Array.isArray(entity)) {
            return entity;
        }

        const updatedEntity = { ...entity };

        // Rule: WebPage should reference GovernmentOffice as mainEntity
        if (entity['@type'] === 'WebPage') {
            const officeEntity = findEntityByType('GovernmentOffice');
            if (officeEntity?.['@id']) {
                updatedEntity.mainEntity = { '@id': officeEntity['@id'] };
            }
        }

        // Rule: GovernmentOffice should reference WebPage as mainEntityOfPage
        if (entity['@type'] === 'GovernmentOffice') {
            const pageEntity = findEntityByType('WebPage');
            if (pageEntity?.['@id']) {
                updatedEntity.mainEntityOfPage = { '@id': pageEntity['@id'] };
            }
        }

        return updatedEntity;
    });
};

export const generateJsonLd = (content: ContentProps): JsonLdData | null => {
    const pageEntity = generatePageEntity({
        content,
    });
    const imageEntity = generateImageObjectEntity();
    const organizationEntity = generateOrganizationEntity();

    const officeBranchEntity =
        content.type === ContentType.OfficePage ? generateOfficeBranchEntity({ content }) : null;

    const entitiesWithoutReferences = [
        pageEntity,
        imageEntity,
        organizationEntity,
        officeBranchEntity,
    ].filter(Boolean) as GraphEntity[];

    const entitiesWithReferences = createReferencesBetweenEntities(entitiesWithoutReferences);

    const baseGraph = generateGraph(entitiesWithReferences);

    return baseGraph;
};
