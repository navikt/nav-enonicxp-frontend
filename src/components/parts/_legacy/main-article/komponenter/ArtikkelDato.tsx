import * as React from 'react';
import { formatDate, getPublishedDateTime } from 'utils/datetime';
import { classNames } from 'utils/classnames';
import { BodyLong, Detail } from '@navikt/ds-react';
import { usePageContentProps } from 'store/pageContext';

import styles from './ArtikkelDato.module.scss';

type Props = {
    publish?: {
        first?: string;
        from?: string;
    };
    createdTime: string;
    modifiedTime: string;
    publishLabel: string;
    modifiedLabel: string;
    type?: 'normal' | 'newsPress';
};

const ArtikkelDato = (props: Props) => {
    const { language } = usePageContentProps();
    const { modifiedTime, publishLabel, modifiedLabel, type = 'normal' } = props;

    const hasMonthName = type === 'newsPress';
    const hasYear = type === 'newsPress';

    const publishedDate = getPublishedDateTime(props);
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

    const publishedAndModifiedString = (
        <>
            {publishedString}
            {modifiedString && (
                <>
                    <span aria-hidden="true" className={styles.divider}>
                        {'|'}
                    </span>
                    {modifiedString}
                </>
            )}
        </>
    );

    if (type === 'newsPress') {
        return (
            <Detail className={classNames(styles.artikkelDato, styles.small)}>
                {publishedAndModifiedString}
            </Detail>
        );
    }

    return (
        <BodyLong as={'time'} dateTime={publishedDate}>
            {publishedAndModifiedString}
        </BodyLong>
    );
};

export default ArtikkelDato;
