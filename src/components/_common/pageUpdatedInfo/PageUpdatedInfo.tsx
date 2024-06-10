import { BodyShort } from '@navikt/ds-react';
import { formatDate } from 'utils/datetime';
import { Language, translator } from 'translations';

import styles from './PageUpdatedInfo.module.scss';

type PageUpdatedInfoProps = {
    datetime: string;
    language?: Language;
};

export const PageUpdatedInfo = ({ datetime, language = 'no' }: PageUpdatedInfoProps) => {
    const formattedDate = formatDate({ datetime });
    const getDatesTranslations = translator('dates', language);
    const updatedString = getDatesTranslations('lastChanged');

    return (
        <BodyShort className={styles.pageUpdatedInfo} size="small">
            {updatedString}&nbsp;{formattedDate}
        </BodyShort>
    );
};
