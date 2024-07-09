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
    const formattedDate = formatDate({ datetime, language });
    const getDatesTranslations = translator('dates', language);
    const updatedString = getDatesTranslations('lastChanged');

    return (
        <div className={classNames(styles.contentWrapper, isSituationPage && styles.situationPage)}>
            <BodyShort className={styles.pageUpdatedInfo} size="small">
                {updatedString}&nbsp;{formattedDate}
            </BodyShort>
        </div>
    );
};
