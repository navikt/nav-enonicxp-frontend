import { getTranslatedAudience } from 'utils/string';
import { appOrigin, getPublicPathname } from 'utils/urls';
import { ReferenceConfig, Thing } from 'components/_common/metatags/structuredData/types';
import { ContentType } from 'types/content-props/_content-common';
import { Audience, AudienceOptions } from 'types/component-props/_mixins';
import { translator } from 'translations';
import { forceArray } from 'utils/arrays';
import { OversiktAudienceOptions } from 'types/content-props/oversikt-props';

const getProviderAudience = (content: ReferenceConfig['content']) => {
    if (content.type === ContentType.Oversikt) {
        const audience = content.data?.audience;
        const providerAudience = forceArray(audience).find(
            (a) => a._selected === Audience.PROVIDER
        ) as OversiktAudienceOptions | undefined;

        return providerAudience
            ? (providerAudience?.provider?.pageType?.overview?.provider_audience ?? [])
            : [];
    }

    const audience = content.data?.audience as unknown as AudienceOptions;
    return audience?._selected === Audience.PROVIDER
        ? (audience?.provider?.provider_audience ?? [])
        : [];
};

export const generateAudienceThings = ({ content }: ReferenceConfig): Thing | null => {
    const url = `${appOrigin}${getPublicPathname(content)}`;
    const getProviderAudienceLabel = translator('providerAudience', content.language);

    const audience = content?.data?.audience as AudienceOptions | OversiktAudienceOptions;
    const audienceArray = forceArray(audience);

    const audienceLabels = audienceArray.reduce((accumulator, audienceItem) => {
        if (audienceItem._selected === Audience.PROVIDER) {
            const providerAudience = getProviderAudience(content);
            const subAudienceLabels = providerAudience
                .map((sub) => getProviderAudienceLabel(sub))
                .filter(Boolean);

            if (subAudienceLabels.length > 0) {
                const subAudienceLabelString = subAudienceLabels.join(', ');
                return [...accumulator, subAudienceLabelString];
            }
            return accumulator;
        }

        if (
            audienceItem._selected === Audience.PERSON ||
            audienceItem._selected === Audience.EMPLOYER
        ) {
            const label = getTranslatedAudience(audienceItem._selected, content.language);
            return [...accumulator, label];
        }
        return accumulator;
    }, [] as string[]);

    if (!audience) {
        return null;
    }

    const audienceLabelString = audienceLabels.join(', ');

    const audienceThing = {
        '@id': `${url}#audience`,
        '@type': 'Audience',
        name: audienceLabelString,
    } as Thing;

    return audienceThing;
};
