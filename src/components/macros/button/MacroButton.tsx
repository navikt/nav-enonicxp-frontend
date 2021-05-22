import React from 'react';
import { MacroButtonProps } from '../../../types/macro-props/button';
import { Button } from '../../_common/button/Button';

export const MacroButton = ({ config }: MacroButtonProps) => {
    if (!config?.button) {
        return null;
    }

    const { content, text, url } = config?.button;

    const href = content?._path || url;

    return (
        <Button type={'standard'} href={href}>
            {text}
        </Button>
    );
};
