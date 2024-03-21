import { BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { ContentProps } from 'types/content-props/_content-common';
import { MicroCard } from '../card/MicroCard';
import { stripXpPathPrefix } from 'utils/urls';
import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';

import styles from './RelatedSituations.module.scss';
import { classNames } from 'utils/classnames';

type RelatedSituationsProps = {
    relatedSituations: ContentProps[];
    title: string;
    description: string;
};

export const RelatedSituations = ({
    relatedSituations,
    title,
    description,
}: RelatedSituationsProps) => {
    const { language, editorView } = usePageContentProps();

    const getStringPart = translator('related', language);

    return (
        <div
            className={classNames(
                styles.relatedSituations,
                editorView === 'edit' && styles.noMargin
            )}
        >
            <Heading level="3" size="medium" spacing>
                {title || getStringPart('otherOffers')}
            </Heading>
            <BodyLong className={styles.description}>
                {description || getStringPart('moreInformation')}
            </BodyLong>
            <ul className={styles.situationsList}>
                {relatedSituations.map((situation) => {
                    const link: LinkProps = {
                        url: stripXpPathPrefix(situation._path),
                        text: situation.data.title || situation.displayName,
                    };
                    return (
                        <li key={situation._id}>
                            <MicroCard link={link} type={CardType.Situation} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
