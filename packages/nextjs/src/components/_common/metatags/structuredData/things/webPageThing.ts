import { ContentProps } from 'types/content-props/_content-common';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { getDescription, getPageTitle } from 'components/_common/metatags/helpers';
import { Thing, PageType } from 'components/_common/metatags/structuredData/types';
import {
    findThingByType,
    pageTypeLibrary,
} from 'components/_common/metatags/structuredData/helpers/thingHelpers';

type ReferenceConfig = {
    content: ContentProps;
    mainEntityOfPage?: string;
    mainEntity?: string;
};

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
    const updatedThing = Object.assign({}, thing) as Thing;
    const officeThing = findThingByType('GovernmentOffice', thingsByType);

    if (officeThing?.['@id']) {
        updatedThing.mainEntity = { '@id': officeThing['@id'] };
    }

    return updatedThing;
};
