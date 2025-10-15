import { appOrigin } from 'utils/urls';
import { getSocialShareImageUrl } from 'components/_common/metatags/helpers';
import { Thing } from 'components/_common/metatags/structuredData/types';

export const generateImageObjectThing = (): Thing => {
    const logoId = `${appOrigin}#logo`;
    const socialShareImageUrl = getSocialShareImageUrl();

    return {
        '@type': 'ImageObject',
        '@id': logoId,
        url: socialShareImageUrl,
    };
};
