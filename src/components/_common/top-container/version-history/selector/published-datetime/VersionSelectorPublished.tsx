import React, { useEffect, useState } from 'react';
import { Select } from '@navikt/ds-react';
import { BEM } from '../../../../../../utils/classnames';
import { ContentProps } from '../../../../../../types/content-props/_content-common';
import { formatDateTime } from '../../../../../../utils/datetime';
import { getVersionSelectorUrl } from '../versionSelectorUtils';
import { VersionSelectorSubmitButton } from '../submit-button/VersionSelectorSubmitButton';

const bem = BEM('version-selector-published');

type Props = {
    content: ContentProps;
    submitVersionUrl: (url: string) => void;
};

export const VersionSelectorPublished = ({
    content,
    submitVersionUrl,
}: Props) => {
    const { versionTimestamps, editorView, timeRequested } = content;

    const currentVersionTimestamp = versionTimestamps?.[0];

    const [selectedDateTime, setSelectedDateTime] = useState(
        currentVersionTimestamp
    );

    useEffect(() => {
        // Reset the current selection when receiving live content
        if (!timeRequested) {
            setSelectedDateTime(currentVersionTimestamp);
        }
    }, [timeRequested]);

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
            <VersionSelectorSubmitButton
                url={url}
                isEditorView={!!editorView}
                submitVersionUrl={submitVersionUrl}
            />
        </div>
    );
};
