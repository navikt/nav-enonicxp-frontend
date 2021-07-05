import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeStandalone } from '../../../lenke/LenkeStandalone';
import { formatDateTime } from '../../../../../utils/datetime';
import './VersionPickerStatus.less';

type Props = {
    contentTime: string;
    requestedTime: string;
    livePath: string;
};

export const VersionPickerStatus = ({
    requestedTime,
    contentTime,
    livePath,
}: Props) => {
    const requestedUnixTime = new Date(requestedTime).getTime();
    const contentUnixTime = new Date(contentTime).getTime();

    const requestedTimeFormatted = formatDateTime(requestedTime, 'nb', true);
    const contentTimeFormatted = formatDateTime(contentTime, 'nb', true);

    return (
        <div className={'version-status'}>
            <Normaltekst>
                {requestedUnixTime >= contentUnixTime
                    ? `Viser innhold fra ${contentTimeFormatted}`
                    : `Innhold fra valgt tid ${requestedTimeFormatted} finnes ikke - viser innhold fra ${contentTimeFormatted}`}
                {' - '}
                <LenkeStandalone withChevron={false} href={livePath}>
                    {'Tilbake til nåtid'}
                </LenkeStandalone>
            </Normaltekst>
        </div>
    );
};
