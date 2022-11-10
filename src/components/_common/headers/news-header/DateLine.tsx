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

    const publishedString = `${getDatesLabel('published')}: ${formatDate(
        createdTime,
        language,
        true,
        true
    )}`;

    const lastChangedString = `${getDatesLabel('lastChanged')}: ${formatDate(
        modifiedTime,
        language,
        true,
        true
    )}`;

    const dateString = `${publishedString}, ${lastChangedString}`;

    return (
        <div className={styles.dateLine}>
            <div className={styles.container}>{dateString}</div>
        </div>
    );
};
