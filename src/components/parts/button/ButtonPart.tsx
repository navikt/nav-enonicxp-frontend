import React from 'react';
import {
    ButtonPartProps,
    ButtonPartSizeProp,
    ButtonPartSizePropLegacy,
    ButtonPartTypeProp,
} from '../../../types/component-props/parts/button';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { Button } from '../../_common/button/Button';
import { ButtonProps } from '@navikt/ds-react';

const legacySizeToSize: {
    [size in ButtonPartSizePropLegacy]: ButtonPartSizeProp;
} = {
    kompakt: 'small',
    mini: 'small',
    normal: 'medium',
};

const typePropToVariant: {
    [type in ButtonPartTypeProp]: ButtonProps['variant'];
} = {
    hoved: 'primary',
    standard: 'secondary',
    flat: 'tertiary',
    fare: 'danger',
};

export const ButtonPart = ({ config }: ButtonPartProps) => {
    const { icon, link, size, type, fullwidth } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Button
            className="buttonPart"
            href={linkProps.url}
            variant={typePropToVariant[type]}
            xpIcon={icon}
            size={legacySizeToSize[size] || size}
            fullWidth={fullwidth}
        >
            {linkProps.text}
        </Button>
    );
};
