import React from 'react';
import { Button } from 'components/_common/button/Button';
import { MacroButtonBlueProps } from 'types/macro-props/button-blue';

export const MacroButtonBlue = ({ config }: MacroButtonBlueProps) => {
    if (!config) {
        return null;
    }

    const { content, text, url } = config.button_blue;

    const href = content?._path || url;

    return (
        <Button variant={'secondary'} href={href}>
            {text}
        </Button>
    );
};
