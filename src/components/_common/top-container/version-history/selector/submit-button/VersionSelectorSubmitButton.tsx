import { Button } from '../../../../button/Button';
import React from 'react';

type Props = {
    url: string;
    isEditorView: boolean;
    submitVersionUrl: (url: string) => void;
};

export const VersionSelectorSubmitButton = ({
    url,
    submitVersionUrl,
    isEditorView,
}: Props) => {
    return (
        <Button
            href={url}
            size={'small'}
            className={'version-selector-submit'}
            onClick={(e) => {
                if (isEditorView) {
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
    );
};
