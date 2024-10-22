import React from 'react';
import { Button } from 'components/_common/button/Button';

type Props = {
    url: string;
    submitVersionUrl: (url: string) => void;
};

export const VersionSelectorSubmitButton = ({ url, submitVersionUrl }: Props) => {
    return (
        <Button
            href={url}
            size={'small'}
            className={'version-selector-submit'}
            onClick={(e) => {
                e.stopPropagation();
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
