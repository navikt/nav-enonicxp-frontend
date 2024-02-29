import {
    AlternativeAudience as AlternativeAudienceType,
    Audience,
    AudienceProps,
    getAudience,
} from 'types/component-props/_mixins';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from '../lenke/LenkeBase';

import styles from './AlternativeAudience.module.scss';
import { stripXpPathPrefix } from 'utils/urls';
import { Fragment } from 'react';
import { joinWithConjunction } from 'utils/string';

type AlternativeAudienceProps = {
    pageTitle: string;
    currentAudience: AudienceProps;
    alternativeAudience: AlternativeAudienceType;
    config: {
        title: string;
        description: string;
    };
};

export const AlternativeAudience = ({
    pageTitle,
    currentAudience,
    alternativeAudience,
}: AlternativeAudienceProps) => {
    const { language } = usePageConfig();

    const currentAudienceKey = getAudience(currentAudience);
    const getAudienceLabel = translator('audience', language);
    const getProviderAudienceLabel = translator('providerAudience', language);
    const getStringPart = translator('stringParts', language);
    const currentAudienceLabel = getAudienceLabel(currentAudienceKey);

    if (!alternativeAudience) {
        return null;
    }

    const getConjunction = (index: number, length: number) => {
        if (index === length - 1) {
            return '.';
        }

        if (audienceLinks.length > 2 && index < audienceLinks.length - 2) {
            return ', ';
        }

        if (index === audienceLinks.length - 2) {
            return ` ${getStringPart('conjunction')} `; // Todo: look up in dictionary
        }
    };

    const buildLinkFromAudience = (
        alternativeAudience: AlternativeAudienceType
    ) => {
        const { person, employer, provider } = alternativeAudience;

        const links = [];

        const personLabel = getAudienceLabel(Audience.PERSON);
        const employerLabel = getAudienceLabel(Audience.EMPLOYER);

        if (person && person.targetPage) {
            links.push({
                title: personLabel,
                url: stripXpPathPrefix(person.targetPage._path),
            });
        }

        if (employer && employer.targetPage) {
            links.push({
                title: employerLabel,
                url: stripXpPathPrefix(employer.targetPage._path),
            });
        }

        if (provider && provider.providerList) {
            provider.providerList.forEach((provider) => {
                const providerLabels = provider.providerAudience.map(
                    (audience) => getProviderAudienceLabel(audience)
                );
                links.push({
                    title: joinWithConjunction(providerLabels, language),
                    url: stripXpPathPrefix(provider.targetPage._path),
                });
            });
        }

        return links;
    };

    const audienceLinks: any[] = buildLinkFromAudience(alternativeAudience);

    return (
        <div className={styles.alternativeAudience}>
            <BodyShort>
                {currentAudienceKey !== 'person' &&
                    `${getStringPart(
                        'for'
                    )} ${currentAudienceLabel}`.toUpperCase()}
                Det finnes også informasjon om {pageTitle.toLowerCase()} til{' '}
                {audienceLinks.map((link, index) => (
                    <Fragment key={index}>
                        <LenkeBase href={link.url}>{link.title}</LenkeBase>
                        {getConjunction(index, audienceLinks.length)}
                    </Fragment>
                ))}
            </BodyShort>
        </div>
    );
};
