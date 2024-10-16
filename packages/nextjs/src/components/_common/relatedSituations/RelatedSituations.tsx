import { BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { MiniCardV2 } from 'components/_common/card/MiniCardV2/MiniCardV2';
import { getCardProps } from 'components/_common/card/card-utils';
import { usePageContentProps } from 'store/pageContext';
import { stripXpPathPrefix } from 'utils/urls';
import { CardType } from 'types/card';
import { classNames } from 'utils/classnames';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';

import style from './RelatedSituations.module.scss';

type Props = {
    relatedSituations: SituationPageProps[];
    title: string;
    description: string;
};

export const getAnchorId = (test: string) => {
    return test.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with hyphens and make lowercase
};

export const RelatedSituations = ({ relatedSituations, title, description }: Props) => {
    const { language, editorView, page } = usePageContentProps();

    const getStringPart = translator('related', language);
    const defaultTitle = getStringPart('otherOffers');
    const actualTitle = title || defaultTitle;

    return (
        <div
            className={classNames(style.relatedSituations, editorView === 'edit' && style.noMargin)}
            id={getAnchorId(actualTitle)}
        >
            <Heading level="3" size="medium" spacing>
                {actualTitle}
            </Heading>
            <BodyLong className={style.description}>
                {description || getStringPart('moreInformation')}
            </BodyLong>
            <ul className={style.situationsList}>
                {relatedSituations.map((situation) => {
                    const { tagline } = getCardProps(situation, page?.config) || {};

                    return (
                        <li key={situation._id}>
                            <MiniCardV2
                                link={{
                                    url: stripXpPathPrefix(situation._path),
                                    text: situation.data.title || situation.displayName,
                                }}
                                type={CardType.Situation}
                                tagline={tagline}
                                className={style.card}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
