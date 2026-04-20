import React from 'react';
import { Knapp } from 'components/_common/knapp/Knapp';

type Props = {
    url: string;
    submitVersionUrl: (url: string) => void;
};

export const VersionSelectorSubmitButton = ({ url, submitVersionUrl }: Props) => {
    return (
        <Knapp
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
        </Knapp>
    );
};
