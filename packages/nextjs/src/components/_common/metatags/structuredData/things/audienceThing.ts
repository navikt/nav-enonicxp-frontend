import { getTranslatedAudience, normalizeToAscii } from 'utils/string';
import { appOrigin } from 'utils/urls';
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
        ? forceArray(audience?.provider?.provider_audience)
        : [];
};

export const generateAudienceThings = ({ content }: ReferenceConfig): Thing[] => {
    const getProviderAudienceLabel = translator('providerAudience', content.language);

    const audience = content?.data?.audience as AudienceOptions | OversiktAudienceOptions;
    const audienceArray = forceArray(audience);

    const audienceLabels = audienceArray.reduce((accumulator, audienceItem) => {
        if (audienceItem._selected === Audience.PROVIDER) {
            const providerAudience = getProviderAudience(content);
            const subAudienceLabels = providerAudience
                .map((sub) => getProviderAudienceLabel(sub))
                .filter(Boolean);

            return [...accumulator, ...subAudienceLabels];
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

    const audienceThings = audienceLabels.map(
        (label) =>
            ({
                '@id': `${appOrigin}/id/audience/${normalizeToAscii(label)}`,
                '@type': 'Audience',
                audienceType: label,
            }) as Thing
    );

    return audienceThings;
};
