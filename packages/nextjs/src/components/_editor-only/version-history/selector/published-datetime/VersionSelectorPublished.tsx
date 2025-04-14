import React, { useState } from 'react';
import { Select } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { formatDateTime } from 'utils/datetime';
import { getVersionSelectorUrl } from 'components/_editor-only/version-history/selector/versionSelectorUtils';
import { VersionSelectorSubmitButton } from 'components/_editor-only/version-history/selector/submit-button/VersionSelectorSubmitButton';

import style from './VersionSelectorPublished.module.scss';

type Props = {
    content: ContentProps;
    versionTimestamps: string[];
    submitVersionUrl: (url: string) => void;
    initialSelection: string | null;
};

export const VersionSelectorPublished = ({
    content,
    versionTimestamps,
    submitVersionUrl,
    initialSelection,
}: Props) => {
    const [selectedDateTime, setSelectedDateTime] = useState(
        initialSelection ?? versionTimestamps[0]
    );

    if (versionTimestamps.length === 0) {
        return <div>{'Fant ingen publiseringer for dette innholdet'}</div>;
    }

    const url = getVersionSelectorUrl(content, selectedDateTime, 'master');

    return (
        <div className={style.versionSelectorPublished}>
            <Select
                label={'Velg en publisering:'}
                onChange={(e) => {
                    setSelectedDateTime(e.target.value);
                }}
                className={style.select}
            >
                {versionTimestamps.map((timestamp, index) => (
                    <option value={timestamp} selected={timestamp === selectedDateTime} key={index}>
                        {formatDateTime(timestamp, 'nb', true)}
                    </option>
                ))}
            </Select>
            <VersionSelectorSubmitButton url={url} submitVersionUrl={submitVersionUrl} />
        </div>
    );
};
