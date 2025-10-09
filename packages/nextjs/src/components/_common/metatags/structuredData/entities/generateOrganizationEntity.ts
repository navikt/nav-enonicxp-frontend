import { appOrigin } from 'utils/urls';
import { GraphEntity } from 'components/_common/metatags/structuredData/types';

export const generateOrganizationEntity = (): GraphEntity => {
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
