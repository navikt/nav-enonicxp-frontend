import { BodyShort } from '@navikt/ds-react';
import { formatDate } from 'utils/datetime';
import { Language, translator } from 'translations';
import { classNames } from 'utils/classnames';

import styles from './PageUpdatedInfo.module.scss';

type PageUpdatedInfoProps = {
    datetime: string;
    language?: Language;
    isSituationPage?: boolean;
};

export const PageUpdatedInfo = ({
    datetime,
    language = 'no',
    isSituationPage,
}: PageUpdatedInfoProps) => {
    const usableLanguage =
        language === 'nn' || language === 'no' || language === 'se' ? 'no' : 'en';

    const formattedDate = formatDate({ datetime, language: usableLanguage });
    const getDatesTranslations = translator('dates', usableLanguage);
    const updatedString = getDatesTranslations('lastChanged');

    return (
        <div className={classNames(styles.contentWrapper, isSituationPage && styles.situationPage)}>
            <BodyShort className={styles.pageUpdatedInfo} size="small">
                {updatedString}&nbsp;{formattedDate}
            </BodyShort>
        </div>
    );
};
