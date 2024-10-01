import { Detail } from '@navikt/ds-react';
import { getPublishedAndModifiedString, GetPublishedAndModifiedStringProps } from 'utils/datetime';

import styles from './DateLine.module.scss';

export const DateLine = ({ content }: GetPublishedAndModifiedStringProps) => {
    const dateString = getPublishedAndModifiedString({ content });

    return (
        <div className={styles.dateLine}>
            <div className={styles.container}>
                <Detail className={styles.dateLabel}>{dateString}</Detail>
            </div>
        </div>
    );
};
