import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Thing } from 'components/_common/metatags/structuredData/types';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { forceArray } from 'utils/arrays';
import { getTranslatedTaxonomy } from 'utils/string';

export const generateGovernmentServiceThings = (content: ContentProps): Thing[] | null => {
    if (content.type !== ContentType.ProductPage) {
        return null;
    }

    const url = `${appOrigin}${getPublicPathname(content)}`;

    const categories = forceArray(content?.data?.taxonomy ?? []).map((taxonomyTerm) => ({
        '@id': `${url}#${taxonomyTerm}`,
        '@type': 'GovernmentService',
        name: getTranslatedTaxonomy(taxonomyTerm, content.language),
    })) as Thing[];

    return categories;
};

export const applyGovernmentServiceReferences = (
    thing: Thing,
    thingsByType: Map<string, Thing[]>
): Thing => {
    const webPageThing = thingsByType.get('WebPage')?.[0];
    const audienceThing = thingsByType.get('Audience')?.[0];
    const organizationThing = thingsByType.get('GovernmentOrganization')?.[0];

    if (!webPageThing || !audienceThing || !organizationThing) {
        return thing;
    }
    const updatedThing = Object.assign(
        {
            subjectOf: { '@id': webPageThing['@id'] },
            audience: { '@id': audienceThing['@id'] },
            provider: { '@id': organizationThing['@id'] },
        },
        thing
    );

    return updatedThing;
};
