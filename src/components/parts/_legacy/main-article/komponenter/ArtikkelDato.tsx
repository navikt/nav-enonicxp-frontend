import * as React from 'react';
import { formatDate } from '../../../../../utils/datetime';
import classNames from 'classnames';
import { BodyLong, Detail } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './ArtikkelDato.module.scss';

interface Props {
    publish?: {
        first?: string;
    };
    createdTime: string;
    modifiedTime: string;
    publishLabel: string;
    modifiedLabel: string;
    type?: 'normal' | 'newsPress';
}

const ArtikkelDato = (props: Props) => {
    const { language } = usePageConfig();
    const {
        publish,
        createdTime,
        modifiedTime,
        publishLabel,
        modifiedLabel,
        type = 'normal',
    } = props;

    const hasMonthName = type === 'newsPress';
    const hasYear = type === 'newsPress';

    const publishedDate = publish?.first ?? createdTime;
    const publishedString = `${publishLabel} ${formatDate({
        datetime: publishedDate,
        language,
        short: hasMonthName,
        year: hasYear,
    })}`;
    let modifiedString = '';
    if (new Date(modifiedTime) > new Date(publishedDate)) {
        modifiedString = `${modifiedLabel} ${formatDate({
            datetime: modifiedTime,
            language,
            short: hasMonthName,
            year: hasYear,
        })}`;
    }

    if (type === 'newsPress') {
        return (
            <Detail
                className={classNames(styles.artikkelDato, styles.small)}
                id="main-article-date-anchor"
            >
                {publishedString}
                {modifiedString && (
                    <>
                        <span aria-hidden="true" className={styles.divider}>
                            {'|'}
                        </span>
                        {modifiedString}
                    </>
                )}
            </Detail>
        );
    }
    return (
        <BodyLong as={'time'} dateTime={publishedDate}>
            {publishedString}
            {modifiedString && (
                <>
                    <span aria-hidden="true">{' | '}</span>
                    {modifiedString}
                </>
            )}
        </BodyLong>
    );
};
export default ArtikkelDato;
