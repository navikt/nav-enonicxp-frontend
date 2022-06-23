import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { LenkeStandalone } from '../../../_common/lenke/LenkeStandalone';
import { formatDateTime } from '../../../../utils/datetime';
import { ContentProps } from '../../../../types/content-props/_content-common';

import style from './VersionStatus.module.scss';

type Props = {
    content: ContentProps;
    requestedDateTime: string;
};

export const VersionStatus = ({ content, requestedDateTime }: Props) => {
    const contentDateTime = content.modifiedTime || content.createdTime;

    const requestedUnixTime = new Date(requestedDateTime).getTime();
    const contentUnixTime = new Date(contentDateTime).getTime();

    const requestedTimeFormatted = formatDateTime(
        requestedDateTime,
        'nb',
        true
    );
    const contentTimeFormatted = formatDateTime(contentDateTime, 'nb', true);

    return (
        <div className={style.versionStatus}>
            <BodyLong>
                {requestedUnixTime >= contentUnixTime
                    ? `Viser innhold fra ${requestedTimeFormatted}`
                    : `Innhold fra valgt tid ${requestedTimeFormatted} finnes ikke - viser innhold fra ${contentTimeFormatted}`}
                {' - '}
                <LenkeStandalone withChevron={false} href={content.livePath}>
                    {'Tilbake til nåtid'}
                </LenkeStandalone>
            </BodyLong>
        </div>
    );
};
