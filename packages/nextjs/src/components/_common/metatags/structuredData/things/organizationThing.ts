import { appOrigin } from 'utils/urls';
import { Thing } from 'components/_common/metatags/structuredData/types';

export const generateOrganizationThing = (): Thing => {
    const organizationId = `${appOrigin}#organization`;
    const logoId = `${appOrigin}#logo`;

    return {
        '@type': 'GovernmentOrganization',
        '@id': organizationId,
        name: 'Nav - Arbeids- og velferdsetaten',
        url: appOrigin,
        logo: { '@id': logoId },
    };
};
