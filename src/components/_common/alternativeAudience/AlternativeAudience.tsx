import { Fragment } from 'react';
import {
    AlternativeAudience as AlternativeAudienceType,
    Audience,
} from 'types/component-props/_mixins';
import { classNames } from 'utils/classnames';
import { usePageContentProps } from 'store/pageContext';
import { Language, translator } from 'translations';
import { BodyShort } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { stripXpPathPrefix } from 'utils/urls';
import { getConjunction, joinWithConjunction } from 'utils/string';

import style from './AlternativeAudience.module.scss';

type AudienceLink = {
    title: string;
    url: string;
};

type Props = {
    alternativeAudience: AlternativeAudienceType;
    productName: string;
    showProductName: boolean;
};

export const AlternativeAudience = ({
    alternativeAudience,
    productName,
    showProductName,
}: Props) => {
    const { language, editorView } = usePageContentProps();

    const getRelatedString = translator('related', language);
    const getStringPart = translator('stringParts', language);

    const name = showProductName ? productName : getStringPart('this');

    const audienceLinks = buildAudienceLinks(alternativeAudience, language);

    return (
        <div
            className={classNames(
                style.alternativeAudience,
                editorView === 'edit' && style.noMargin
            )}
        >
            <BodyShort>
                {getRelatedString('relatedAudience').replace('{name}', name.toLowerCase())}{' '}
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
            </BodyShort>
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
            const providerLabels = singleProvider.providerAudience.map((audience) => {
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
