import { BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ContentProps } from 'types/content-props/_content-common';
import { MicroCard } from '../card/MicroCard';
import { stripXpPathPrefix } from 'utils/urls';
import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';

import styles from './RelatedSituations.module.scss';

type RelatedSituationsProps = {
    relatedSituations: ContentProps[];
    config: {
        title: string;
        description: string;
    };
};

export const RelatedSituations = ({
    relatedSituations,
    config,
}: RelatedSituationsProps) => {
    const { language } = usePageConfig();
    if (!config) {
        return null;
    }
    const { title, description } = config;
    const getStringPart = translator('stringParts', language);

    if (!relatedSituations || relatedSituations.length === 0) {
        return null;
    }

    return (
        <div className={styles.relatedSituations}>
            <Heading level="3" size="medium" spacing>
                {title || getStringPart('relevantFor')}
            </Heading>
            {description && <BodyLong spacing>{description}</BodyLong>}
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
