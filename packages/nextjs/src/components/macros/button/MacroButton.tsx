import React from 'react';
import { MacroButtonProps } from 'types/macro-props/button';
import { Knapp } from 'components/_common/knapp/Knapp';

export const MacroButton = ({ config }: MacroButtonProps) => {
    const buttonConfig = config?.button || config?.button_blue;

    if (!buttonConfig) {
        return null;
    }

    const { content, text, url } = buttonConfig;

    const href = content?._path || url;

    return (
        <Knapp variant={'secondary'} href={href}>
            {text}
        </Knapp>
    );
};
