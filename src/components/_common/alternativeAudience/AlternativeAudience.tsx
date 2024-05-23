import { Fragment } from 'react';
import { BodyLong } from '@navikt/ds-react';
import {
    AlternativeAudience as AlternativeAudienceType,
    Audience,
} from 'types/component-props/_mixins';
import { usePageContentProps } from 'store/pageContext';
import { Language, translator } from 'translations';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { stripXpPathPrefix } from 'utils/urls';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';
import { getConjunction, joinWithConjunction } from 'utils/string';

import style from './AlternativeAudience.module.scss';

type AudienceLink = {
    title: string;
    url: string;
};

export const AlternativeAudience = () => {
    const { data, language, displayName } = usePageContentProps<ProductPageProps>();
    const { alternativeAudience } = data;

    if (!alternativeAudience) {
        return null;
    }

    const getRelatedString = translator('related', language);

    const audienceLinks = buildAudienceLinks(alternativeAudience, language);

    return (
        <div className={style.alternativeAudience}>
            <BodyLong>
                {getRelatedString('relatedAudience').replace('{name}', displayName.toLowerCase())}{' '}
                {audienceLinks.map((link, index) => (
                    <Fragment key={index}>
                        <LenkeInline href={link.url} analyticsLabel={'Aktuell målgruppe'}>
                            {link.title}
                        </LenkeInline>
                        {getConjunction({
                            index,
                            length: audienceLinks.length,
                            language,
                        })}
                    </Fragment>
                ))}
            </BodyLong>
        </div>
    );
};

const buildAudienceLinks = (
    alternativeAudience: AlternativeAudienceType,
    language: Language
): AudienceLink[] => {
    const { person, employer, provider } = alternativeAudience;
    const getAudienceLabel = translator('audience', language);
    const getProviderAudienceLabel = translator('providerAudience', language);

    const links: AudienceLink[] = [];

    if (person?.targetPage) {
        links.push({
            title: getAudienceLabel(Audience.PERSON),
            url: stripXpPathPrefix(person.targetPage._path),
        });
    }

    if (employer?.targetPage) {
        links.push({
            title: getAudienceLabel(Audience.EMPLOYER),
            url: stripXpPathPrefix(employer.targetPage._path),
        });
    }

    // For providers, iterate the actual provider category
    // rather than just showing "samarbeidspartnere" as we do
    // with 'person' and 'arbeidsgiver'.
    if (provider?.providerList) {
        provider.providerList.forEach((singleProvider) => {
            if (!singleProvider.targetPage) return;
            const providerLabels = singleProvider.providerAudience.map((audience) => {
                if (typeof audience === 'string') return ''; // Failsafe for old data.
                if (audience.overrideLabel) return audience.overrideLabel;
                return getProviderAudienceLabel(audience.name);
            });
            links.push({
                title: joinWithConjunction(providerLabels, language),
                url: stripXpPathPrefix(singleProvider.targetPage._path),
            });
        });
    }

    return links;
};
