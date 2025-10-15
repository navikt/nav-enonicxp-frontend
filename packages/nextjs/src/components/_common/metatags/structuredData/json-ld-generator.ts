import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Thing, JsonLdData } from './types';
import { applyOfficeBranchReferences } from './things/officeBranchThing';
import { generateImageObjectThing } from './things/imageObjectThing';
import { generateOrganizationThing } from './things/organizationThing';
import { applyWebPageReferences, generateWebPageThing } from './things/webPageThing';
import { createThingLibraries } from './helpers/thingHelpers';

const createReferencesBetweenThings = (things: Thing[]): Thing[] => {
    const { thingsByType } = createThingLibraries(things);

    return things.map((thing) => {
        if (!thing || typeof thing !== 'object' || Array.isArray(thing)) {
            return thing;
        }

        // Apply reference rules based on thing type
        if (thing['@type'] === 'WebPage') {
            return applyWebPageReferences(thing, thingsByType);
        }

        if (thing['@type'] === 'GovernmentOffice') {
            return applyOfficeBranchReferences(thing, thingsByType);
        }

        return thing;
    });
};

const buildCommonThings = (content: ContentProps): Thing[] => {
    return [
        generateImageObjectThing(),
        generateOrganizationThing(),
        generateWebPageThing({ content }),
    ];
};

const buildPageSpecificThings = (content: ContentProps): Thing[] => {
    const things: Thing[] = [];

    // Add office branch thing for office pages
    if (content.type === ContentType.OfficePage) {
        // For now, do not augment with office branch data. We need a baseline before moving on to
        // more complex structures.
        // things.push(generateOfficeBranchThing({ content }));
    }

    return things;
};

const buildAllThings = (content: ContentProps): Thing[] => {
    const commonThings = buildCommonThings(content);
    const pageSpecificThings = buildPageSpecificThings(content);

    return [...commonThings, ...pageSpecificThings];
};

const generateGraph = (things: Thing[]): JsonLdData => {
    return {
        '@context': 'https://schema.org',
        '@graph': things,
    };
};

export const generateJsonLd = (content: ContentProps): JsonLdData | null => {
    const unreferencedThings = buildAllThings(content);
    const referencedThings = createReferencesBetweenThings(unreferencedThings);

    return generateGraph(referencedThings);
};
