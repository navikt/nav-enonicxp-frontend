import { Fragment } from 'react';
import {
    AlternativeAudience as AlternativeAudienceType,
    Audience,
} from 'types/component-props/_mixins';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from '../lenke/LenkeBase';

import { stripXpPathPrefix } from 'utils/urls';
import { getConjunction, joinWithConjunction } from 'utils/string';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ContentProps } from 'types/content-props/_content-common';

import styles from './AlternativeAudience.module.scss';

type AlternativeAudienceProps = {
    alternativeAudience: AlternativeAudienceType;
    pageProps: ContentProps;
    config: {
        name: string;
    };
};

type AudienceLink = {
    title: string;
    url: string;
};

export const AlternativeAudience = ({
    alternativeAudience,
    pageProps,
    config,
}: AlternativeAudienceProps) => {
    const { language } = usePageConfig();

    const productName = pageProps.data?.title || pageProps.displayName;

    const getAudienceLabel = translator('audience', language);
    const getProviderAudienceLabel = translator('providerAudience', language);
    const getRelatedString = translator('related', language);

    // If the page is in preview mode, audience from the page props will be empty,
    // so display a note about 'mark as ready' to the editor, as we can't actually
    // display the audience until the page has been refreshed.
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

    const buildAudienceLinks = (
        alternativeAudience: AlternativeAudienceType
    ): AudienceLink[] => {
        const { person, employer, provider } = alternativeAudience;

        const links = [];

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
                const providerLabels = singleProvider.providerAudience.map(
                    (audience) => getProviderAudienceLabel(audience)
                );
                links.push({
                    title: joinWithConjunction(providerLabels, language),
                    url: stripXpPathPrefix(singleProvider.targetPage._path),
                });
            });
        }

        return links;
    };

    const audienceLinks = buildAudienceLinks(alternativeAudience);

    return (
        <div className={styles.alternativeAudience}>
            <BodyShort>
                {getRelatedString('relatedAudience').replace(
                    '{name}',
                    (config.name || productName).toLowerCase()
                )}{' '}
                {audienceLinks.map((link, index) => (
                    <Fragment key={index}>
                        <LenkeBase href={link.url}>{link.title}</LenkeBase>
                        {getConjunction({
                            index,
                            length: audienceLinks.length,
                            language,
                        })}
                    </Fragment>
                ))}
            </BodyShort>
        </div>
    );
};
