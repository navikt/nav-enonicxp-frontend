import { Detail } from '@navikt/ds-react';
import { getPublishedAndModifiedString } from 'utils/datetime';
import { ContentProps } from 'types/content-props/_content-common';

import styles from './DateLine.module.scss';

type DateLineProps = {
    contentProps: ContentProps;
};

export const DateLine = ({ contentProps }: DateLineProps) => {
    const dateString = getPublishedAndModifiedString(contentProps);

    return (
        <div className={styles.dateLine}>
            <div className={styles.container}>
                <Detail className={styles.dateLabel}>{dateString}</Detail>
            </div>
        </div>
    );
};
