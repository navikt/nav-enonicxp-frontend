import React from 'react';
import { MacroButtonProps } from 'types/macro-props/button';
import { Button } from 'components/_common/button/Button';

export const MacroButton = ({ config }: MacroButtonProps) => {
    const buttonConfig = config?.button ?? config?.button_blue;

    if (!buttonConfig) {
        return null;
    }

    const { content, text, url } = buttonConfig;

    const href = content?._path ?? url;

    return (
        <Button variant={'secondary'} href={href}>
            {text}
        </Button>
    );
};
