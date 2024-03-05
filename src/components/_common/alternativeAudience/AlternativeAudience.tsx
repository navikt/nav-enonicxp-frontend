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
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ContentProps } from 'types/content-props/_content-common';
import { current } from '@reduxjs/toolkit';

type AlternativeAudienceProps = {
    alternativeAudience: AlternativeAudienceType;
    pageProps: ContentProps;
    config: {
        name: string;
    };
};

export const AlternativeAudience = ({
    alternativeAudience,
    pageProps,
    config,
}: AlternativeAudienceProps) => {
    const { language } = usePageConfig();

    const currentAudience = pageProps.data?.audience;
    const currentAudienceKey = getAudience(currentAudience);
    const pageTitle = pageProps.data?.title || pageProps.displayName;

    const getAudienceLabel = translator('audience', language);
    const getProviderAudienceLabel = translator('providerAudience', language);
    const getStringPart = translator('stringParts', language);
    const getRelatedString = translator('related', language);

    const isComponentPreviewMode = pageProps._id === '';

    if (isComponentPreviewMode) {
        return (
            <EditorHelp
                type={'info'}
                text={
                    'Aktuelle målgrupper vises her når du klikker "marker som klar".'
                }
            />
        );
    }

    if (!alternativeAudience) {
        return (
            <EditorHelp
                type={'error'}
                text={
                    'Feil: Du har huket av for å vise aktuelle målgrupper i denne seksjonen, men ingen målgrupper er valgt i metadata til venstre.'
                }
            />
        );
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

    const getProviderTypes = () => {
        if (currentAudience._selected !== Audience.PROVIDER) {
            return [];
        }

        return currentAudience[currentAudience._selected].provider_audience;
    };

    const audienceLinks: any[] = buildLinkFromAudience(alternativeAudience);

    return (
        <div className={styles.alternativeAudience}>
            <BodyShort>
                {getRelatedString('relatedAudience').replace(
                    '{name}',
                    (config.name || pageTitle).toLowerCase()
                )}{' '}
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
