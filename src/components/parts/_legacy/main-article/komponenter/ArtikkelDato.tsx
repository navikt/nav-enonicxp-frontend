import * as React from 'react';
import { formatDate } from '../../../../../utils/datetime';
import { BodyLong, Detail } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './ArtikkelDato.module.scss';
import classNames from 'classnames';

interface Props {
    publish?: {
        first?: string;
    };
    createdTime: string;
    modifiedTime: string;
    publishLabel: string;
    modifiedLabel: string;
    type?: 'normal' | 'press';
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

    const hasMonthName = type === 'press';
    const hasYear = type === 'press';

    const publishedDate = publish?.first ?? createdTime;
    const publishedString = `${publishLabel} ${formatDate(
        publishedDate,
        language,
        hasMonthName,
        hasYear
    )}`;
    let modifiedString = '';
    if (new Date(modifiedTime) > new Date(publishedDate)) {
        modifiedString = ` ${modifiedLabel} ${formatDate(
            modifiedTime,
            language,
            hasMonthName,
            hasYear
        )}`;
    }
    if (type === 'press') {
        return (
            <Detail className={classNames(styles.artikkelDato, styles.small)}>
                {publishedString}
                {modifiedString && (
                    <>
                        <span aria-hidden="true">{','}</span>
                        {modifiedString.toLowerCase()}
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
                    <span aria-hidden="true">{' |'}</span>
                    {modifiedString}
                </>
            )}
        </BodyLong>
    );
};
export default ArtikkelDato;
