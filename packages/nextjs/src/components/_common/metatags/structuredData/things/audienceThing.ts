import { getTranslatedAudience } from 'utils/string';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { ReferenceConfig, Thing } from 'components/_common/metatags/structuredData/types';
import { ContentType } from 'types/content-props/_content-common';

export const generateAudienceThings = ({ content }: ReferenceConfig): Thing | null => {
    if (content.type !== ContentType.ProductPage) {
        return null;
    }

    const url = `${appOrigin}${getPublicPathname(content)}`;

    const audience = content?.data?.audience?._selected;

    if (!audience) {
        return null;
    }

    const audienceLabel = getTranslatedAudience(audience, content.language);

    const audienceThing = {
        '@id': `${url}#audience`,
        '@type': 'Audience',
        name: audienceLabel,
    } as Thing;

    return audienceThing;
};
