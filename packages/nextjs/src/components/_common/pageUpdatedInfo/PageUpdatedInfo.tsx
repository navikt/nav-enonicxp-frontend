import { BodyShort } from '@navikt/ds-react';
import { formatDate } from 'utils/datetime';
import { Language, translator } from 'translations';

import styles from './PageUpdatedInfo.module.scss';

type PageUpdatedInfoProps = {
    datetime: string;
    language?: Language;
};

export const PageUpdatedInfo = ({ datetime, language = 'no' }: PageUpdatedInfoProps) => {
    const usableLanguage =
        language === 'nn' || language === 'no' || language === 'se' ? 'no' : 'en';

    const formattedDate = formatDate({ datetime, language: usableLanguage });
    const getDatesTranslations = translator('dates', usableLanguage);
    const updatedString = getDatesTranslations('lastChanged');

    return (
        <BodyShort className={styles.pageUpdatedInfo} size="small">
            {updatedString}&nbsp;{formattedDate}
        </BodyShort>
    );
};
