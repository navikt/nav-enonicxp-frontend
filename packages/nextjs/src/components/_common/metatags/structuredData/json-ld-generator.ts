import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { GraphEntity, JsonLdData } from './types';
import { generateOfficeBranchEntity } from './entities/generateOfficeBranchEntity';
import { generateImageObjectEntity } from './entities/generateImageObjectEntity';
import { generateOrganizationEntity } from './entities/generateOrganizationEntity';
import { generatePageEntity } from './entities/generatePageEntity';

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

        // Rule: WebPage should reference GovernmentOffice as the mainEntity
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
