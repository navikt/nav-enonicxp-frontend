import { appOrigin } from 'utils/urls';
import { getSocialShareImageUrl } from 'components/_common/metatags/helpers';
import { GraphEntity } from 'components/_common/metatags/structuredData/types';

export const generateImageObjectEntity = (): GraphEntity => {
    const logoId = `${appOrigin}#logo`;
    const socialShareImageUrl = getSocialShareImageUrl();

    return {
        '@type': 'ImageObject',
        '@id': logoId,
        url: socialShareImageUrl,
    };
};
