import { ContentProps } from 'types/content-props/_content-common';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { getPageTitle } from 'components/_common/metatags/helpers';
import { GraphEntity } from 'components/_common/metatags/structuredData/types';

type ReferenceConfig = {
    content: ContentProps;
    mainEntityOfPage?: string;
    mainEntity?: string;
};

export const generateOfficeBranchEntity = ({ content }: ReferenceConfig): GraphEntity => {
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
