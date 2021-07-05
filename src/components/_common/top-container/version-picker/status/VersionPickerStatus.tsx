import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeStandalone } from '../../../lenke/LenkeStandalone';
import { formatDateTime } from '../../../../../utils/datetime';
import { ContentProps } from '../../../../../types/content-props/_content-common';
import './VersionPickerStatus.less';

type Props = {
    content: ContentProps;
    requestedTime: string;
};

export const VersionPickerStatus = ({ content, requestedTime }: Props) => {
    const contentDateTime = content.modifiedTime || content.createdTime;

    const requestedUnixTime = new Date(requestedTime).getTime();
    const contentUnixTime = new Date(contentDateTime).getTime();

    const requestedTimeFormatted = formatDateTime(requestedTime, 'nb', true);
    const contentTimeFormatted = formatDateTime(contentDateTime, 'nb', true);

    return (
        <div className={'version-status'}>
            <Normaltekst>
                {requestedUnixTime >= contentUnixTime
                    ? `Viser innhold fra ${contentTimeFormatted}`
                    : `Innhold fra valgt tid ${requestedTimeFormatted} finnes ikke - viser innhold fra ${contentTimeFormatted}`}
                {' - '}
                <LenkeStandalone withChevron={false} href={content.livePath}>
                    {'Tilbake til nåtid'}
                </LenkeStandalone>
            </Normaltekst>
        </div>
    );
};
