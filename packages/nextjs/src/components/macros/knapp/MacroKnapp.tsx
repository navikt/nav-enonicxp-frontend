import React from 'react';
import { MacroKnappProps } from 'types/macro-props/knapp';
import { Knapp } from 'components/_common/knapp/Knapp';

export const MacroKnapp = ({ config }: MacroKnappProps) => {
    const knappConfig = config?.button || config?.button_blue;
    if (!knappConfig) {
        return null;
    }

    const { content, text, url } = knappConfig;
    const href = content?._path || url;

    return (
        <Knapp variant={'secondary'} href={href}>
            {text}
        </Knapp>
    );
};
