import { BodyShort } from '@navikt/ds-react';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';
import { Audience, AudienceOptions, getAudience } from 'types/component-props/_mixins';
import { joinWithConjunction } from 'utils/string';

import style from './GeneralPageHeader.module.scss';

type Props = {
    tagLine: string;
};

export const GeneralPageHeaderTagLine = (props: Props) => {
    const { data, language } = usePageContentProps<ProductPageProps>();

    const getAudienceLabel = translator('audience', language);
    const getProviderAudienceLabel = translator('providerAudience', language);
    const getStringPart = translator('stringParts', language);

    const getProviderTypes = (audience: AudienceOptions) => {
        if (audience._selected !== Audience.PROVIDER) {
            return [];
        }
        return audience[audience._selected].provider_audience;
    };

    const buildAudienceAffirmation = () => {
        const { audience: currentAudience } = data;
        const currentAudienceKey = getAudience(currentAudience);

        if (!currentAudience || !currentAudienceKey || currentAudienceKey === 'person') {
            return '';
        }

        const currentAudienceLabel = getAudienceLabel(currentAudienceKey);
        const providerTypes = getProviderTypes(currentAudience) || [];
        const providerTypesString = joinWithConjunction(
            providerTypes.map((type) => getProviderAudienceLabel(type)),
            language
        );

        const forString = `${getStringPart('for').charAt(0).toUpperCase()}${getStringPart(
            'for'
        ).slice(1)}`;

        return `  —  ${forString} ${providerTypesString || currentAudienceLabel}`;
    };

    return (
        <BodyShort className={style.tagline} size="small">
            {props.tagLine}
            {buildAudienceAffirmation()}
        </BodyShort>
    );
};
