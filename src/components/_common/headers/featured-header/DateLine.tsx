import { Detail } from '@navikt/ds-react';
import { Language, translator } from 'translations';
import { formatDate } from 'utils/datetime';

import styles from './DateLine.module.scss';

type DateLineProps = {
    createdTime: string;
    modifiedTime: string;
    language: Language;
};

export const DateLine = ({
    createdTime,
    modifiedTime,
    language,
}: DateLineProps) => {
    const getDatesLabel = translator('dates', language);

    const buildDateString = (desc: string, date: string) => {
        return `${desc}: ${formatDate({
            datetime: date,
            language,
            short: true,
            year: true,
        })}`;
    };

    const publishedString = buildDateString(
        getDatesLabel('published'),
        createdTime
    );

    const lastChangedString = buildDateString(
        getDatesLabel('lastChanged'),
        modifiedTime
    );

    const dateString = `${publishedString}, ${lastChangedString}`;

    return (
        <div className={styles.dateLine}>
            <div className={styles.container}>
                <Detail className={styles.dateLabel}>{dateString}</Detail>
            </div>
        </div>
    );
};
