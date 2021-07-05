import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeStandalone } from '../../../lenke/LenkeStandalone';
import { formatDateTime } from '../../../../../utils/datetime';
import { ContentProps } from '../../../../../types/content-props/_content-common';
import './VersionPickerStatus.less';

type Props = {
    content: ContentProps;
    requestedDateTime: string;
};

export const VersionPickerStatus = ({ content, requestedDateTime }: Props) => {
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
        <div className={'version-status'}>
            <Normaltekst>
                {requestedUnixTime >= contentUnixTime
                    ? `Viser innhold fra ${requestedTimeFormatted}`
                    : `Innhold fra valgt tid ${requestedTimeFormatted} finnes ikke - viser innhold fra ${contentTimeFormatted}`}
                {' - '}
                <LenkeStandalone withChevron={false} href={content.livePath}>
                    {'Tilbake til nåtid'}
                </LenkeStandalone>
            </Normaltekst>
        </div>
    );
};
