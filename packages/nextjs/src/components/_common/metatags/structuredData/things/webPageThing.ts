import { appOrigin, getPublicPathname } from 'utils/urls';
import { getDescription, getPageTitle } from 'components/_common/metatags/helpers';
import { Thing, PageType, ReferenceConfig } from 'components/_common/metatags/structuredData/types';
import { pageTypeLibrary } from 'components/_common/metatags/structuredData/helpers/thingHelpers';

const DEFAULT_PAGE_TYPE: PageType = 'WebPage';

export const generateWebPageThing = ({ content }: ReferenceConfig): Thing => {
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
    } as Thing;
};

export const applyWebPageReferences = (thing: Thing, thingsByType: Map<string, Thing[]>): Thing => {
    const governmentServiceThings = thingsByType.get('GovernmentService')?.[0];

    const updatedThing = Object.assign(
        {
            about: governmentServiceThings ? { '@id': governmentServiceThings['@id'] } : undefined,
        },
        thing
    );

    return updatedThing;
};
