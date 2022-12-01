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

    const createdDate = createdTime.split('T')[0];
    const modifiedDate = modifiedTime.split('T')[0];
    const wasChangedAfterPublish = createdDate !== modifiedDate;

    const buildDateString = (desc: string, date: string) => {
        if (!date) {
            return '';
        }
        return `${desc} ${formatDate({
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
    ).toLowerCase();

    const dateString = wasChangedAfterPublish
        ? `${publishedString}, ${lastChangedString}`
        : publishedString;

    return (
        <div className={styles.dateLine}>
            <div className={styles.container}>
                <Detail className={styles.dateLabel}>{dateString}</Detail>
            </div>
        </div>
    );
};
