import { Fragment } from 'react';
import {
    AlternativeAudience as AlternativeAudienceType,
    Audience,
} from 'types/component-props/_mixins';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { BodyShort } from '@navikt/ds-react';

import { stripXpPathPrefix } from 'utils/urls';
import { getConjunction, joinWithConjunction } from 'utils/string';
import { LenkeInline } from '../lenke/LenkeInline';
import { usePageContext } from 'store/pageContext';

import styles from './AlternativeAudience.module.scss';

type AlternativeAudienceProps = {
    alternativeAudience: AlternativeAudienceType;
    productName: string;
    showProductName: boolean;
};

type AudienceLink = {
    title: string;
    url: string;
};

export const AlternativeAudience = ({
    alternativeAudience,
    productName,
    showProductName,
}: AlternativeAudienceProps) => {
    const { language, editorView } = usePageContext();

    const getAudienceLabel = translator('audience', language);
    const getProviderAudienceLabel = translator('providerAudience', language);
    const getRelatedString = translator('related', language);
    const getStringPart = translator('stringParts', language);

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
    const name = showProductName ? productName : getStringPart('this');

    return (
        <div
            className={classNames(
                styles.alternativeAudience,
                editorView === 'edit' && styles.noMargin
            )}
        >
            <BodyShort>
                {getRelatedString('relatedAudience').replace(
                    '{name}',
                    name.toLowerCase()
                )}{' '}
                {audienceLinks.map((link, index) => (
                    <Fragment key={index}>
                        <LenkeInline
                            href={link.url}
                            analyticsLabel={'Aktuell målgruppe'}
                        >
                            {link.title}
                        </LenkeInline>
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
