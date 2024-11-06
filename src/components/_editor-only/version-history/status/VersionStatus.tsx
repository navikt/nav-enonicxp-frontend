import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import { formatDateTime } from 'utils/datetime';
import { ContentProps } from 'types/content-props/_content-common';
import { getVersionSelectorUrl } from 'components/_editor-only/version-history/selector/versionSelectorUtils';

import style from './VersionStatus.module.scss';

type Props = {
    content: ContentProps;
    requestedDateTime: string;
    submitVersionUrl: (url: string) => void;
};

export const VersionStatus = ({ content, requestedDateTime, submitVersionUrl }: Props) => {
    const contentDateTime = content.modifiedTime || content.createdTime;

    const requestedTimeFormatted = formatDateTime(requestedDateTime, 'nb', true);
    const contentTimeFormatted = formatDateTime(contentDateTime, 'nb', true);

    const requestedUnixTime = dayjs(requestedDateTime).startOf('minute').unix();
    const contentUnixTime = dayjs(contentDateTime).startOf('minute').unix();

    return (
        <div className={style.versionStatus}>
            <BodyLong>
                {requestedUnixTime >= contentUnixTime
                    ? `Viser innhold fra ${requestedTimeFormatted}`
                    : `Innhold fra valgt tid ${requestedTimeFormatted} finnes ikke - viser innhold fra ${contentTimeFormatted}`}
                {' - '}
                <LenkeStandalone
                    withChevron={false}
                    href={'#'}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        submitVersionUrl(getVersionSelectorUrl(content));
                    }}
                >
                    {'Tilbake til nåtid'}
                </LenkeStandalone>
            </BodyLong>
        </div>
    );
};
