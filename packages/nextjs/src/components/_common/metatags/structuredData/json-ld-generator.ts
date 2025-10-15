import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Thing, JsonLdData } from './types';
import { applyOfficeBranchReferences } from './things/officeBranchThing';
import { generateImageObjectThing } from './things/imageObjectThing';
import { generateOrganizationThing } from './things/organizationThing';
import { applyWebPageReferences, generateWebPageThing } from './things/webPageThing';
import { createThingLibraries } from './helpers/thingHelpers';

const createReferencesBetweenEntities = (entities: Thing[]): Thing[] => {
    const { thingsByType } = createThingLibraries(entities);

    return entities.map((entity) => {
        if (!entity || typeof entity !== 'object' || Array.isArray(entity)) {
            return entity;
        }

        // Apply reference rules based on entity type
        if (entity['@type'] === 'WebPage') {
            return applyWebPageReferences(entity, thingsByType);
        }

        if (entity['@type'] === 'GovernmentOffice') {
            return applyOfficeBranchReferences(entity, thingsByType);
        }

        return entity;
    });
};

const buildCommonEntities = (content: ContentProps): Thing[] => {
    return [
        generateImageObjectThing(),
        generateOrganizationThing(),
        generateWebPageThing({ content }),
    ];
};

const buildPageSpecificEntities = (content: ContentProps): Thing[] => {
    const entities: Thing[] = [];

    // Add office branch entity for office pages
    if (content.type === ContentType.OfficePage) {
        // For now, do not augment with office branch data. We need a baseline before moving on to
        // more complex structures.
        // entities.push(generateOfficeBranchThing({ content }));
    }

    return entities;
};

const buildAllEntities = (content: ContentProps): Thing[] => {
    const commonEntities = buildCommonEntities(content);
    const pageSpecificEntities = buildPageSpecificEntities(content);

    return [...commonEntities, ...pageSpecificEntities];
};

const generateGraph = (graphEntities: Thing[]): JsonLdData => {
    return {
        '@context': 'https://schema.org',
        '@graph': graphEntities,
    };
};

export const generateJsonLd = (content: ContentProps): JsonLdData | null => {
    const unreferencedEntities = buildAllEntities(content);
    const referencedEntities = createReferencesBetweenEntities(unreferencedEntities);

    return generateGraph(referencedEntities);
};
