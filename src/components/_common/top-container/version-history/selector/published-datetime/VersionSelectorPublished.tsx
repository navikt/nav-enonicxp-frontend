import React, { useState } from 'react';
import { Select } from '@navikt/ds-react';
import { BEM } from '../../../../../../utils/classnames';
import { ContentProps } from '../../../../../../types/content-props/_content-common';
import { formatDateTime } from '../../../../../../utils/datetime';
import { Button } from '../../../../button/Button';
import { getVersionSelectorUrl } from '../versionSelectorUtils';
import './VersionSelectorPublished.less';

const bem = BEM('version-selector-published');

type Props = { content: ContentProps; submitVersionUrl: (url: string) => void };

export const VersionSelectorPublished = ({
    content,
    submitVersionUrl,
}: Props) => {
    const { versionTimestamps, editorView } = content;

    const currentVersionTimestamp = versionTimestamps?.[0];

    const [selectedDateTime, setSelectedDateTime] = useState(
        currentVersionTimestamp
    );

    if (!currentVersionTimestamp) {
        return <div>{'Fant ingen publiseringer for dette innholdet'}</div>;
    }

    const url = getVersionSelectorUrl(content, selectedDateTime, 'master');

    return (
        <div className={bem()}>
            <Select
                label={'Velg en publisering:'}
                onChange={(e) => {
                    setSelectedDateTime(e.target.value);
                }}
                className={bem('select')}
            >
                {versionTimestamps.map((timestamp, index) => (
                    <option value={timestamp} key={index}>
                        {formatDateTime(timestamp, 'nb', true)}
                    </option>
                ))}
            </Select>
            <Button
                href={url}
                kompakt={true}
                className={bem('button')}
                onClick={(e) => {
                    if (editorView) {
                        e.stopPropagation();
                    }
                    e.preventDefault();
                    submitVersionUrl(url);
                }}
                prefetch={false}
                disabled={!url}
            >
                {'Hent innhold'}
            </Button>
        </div>
    );
};
