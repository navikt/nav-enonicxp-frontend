import React from 'react';
import {
    ButtonPartProps,
    ButtonPartSizeProp,
    ButtonPartSizePropLegacy,
} from '../../../types/component-props/parts/button';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { Button } from '../../_common/button/Button';

const legacySizeToSize: {
    [size in ButtonPartSizePropLegacy]: ButtonPartSizeProp;
} = {
    kompakt: 'small',
    mini: 'small',
    normal: 'medium',
};

export const ButtonPart = ({ config }: ButtonPartProps) => {
    const { icon, link, size, type, fullwidth } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Button
            href={linkProps.url}
            type={type}
            icon={icon}
            size={legacySizeToSize[size] || size}
            fullWidth={fullwidth}
        >
            {linkProps.text}
        </Button>
    );
};
