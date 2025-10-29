import { ContentProps } from 'types/content-props/_content-common';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { getPageTitle } from 'components/_common/metatags/helpers';
import { Thing } from 'components/_common/metatags/structuredData/types';
import { findThingByType } from 'components/_common/metatags/structuredData/helpers/thingHelpers';

type ReferenceConfig = {
    content: ContentProps;
    mainEntityOfPage?: string;
    mainEntity?: string;
};

export const generateOfficeBranchThing = ({ content }: ReferenceConfig): Thing => {
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

export const applyOfficeBranchReferences = (
    thing: Thing,
    thingsByType: Map<string, Thing[]>
): Thing => {
    const pageThing = findThingByType('WebPage', thingsByType);

    if (!pageThing) {
        return thing;
    }
    const updatedThing = Object.assign({ '@id': pageThing['@id'] }, thing);
    return updatedThing;
};
