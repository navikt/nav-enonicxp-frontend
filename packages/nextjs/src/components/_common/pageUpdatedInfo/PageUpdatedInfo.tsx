import { BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { formatDate } from 'utils/datetime';
import { Language, translator } from 'translations';

import styles from './PageUpdatedInfo.module.scss';

type PageUpdatedInfoProps = {
    datetime: string;
    language?: Language;
    className?: string;
};

export const PageUpdatedInfo = ({ datetime, language = 'no', className }: PageUpdatedInfoProps) => {
    const usableLanguage =
        language === 'nn' || language === 'no' || language === 'se' ? 'no' : 'en';

    const formattedDate = formatDate({ datetime, language: usableLanguage });
    const getDatesTranslations = translator('dates', usableLanguage);
    const updatedString = getDatesTranslations('lastChanged');

    return (
        <BodyShort className={classNames(styles.pageUpdatedInfo, className)} size="small">
            {updatedString}&nbsp;{formattedDate}
        </BodyShort>
    );
};
