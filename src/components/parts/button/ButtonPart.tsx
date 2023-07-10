import React from 'react';
import {
    ButtonPartProps,
    ButtonPartSizeProp,
    ButtonPartSizePropLegacy,
    ButtonPartTypeProp,
} from 'types/component-props/parts/button';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Button } from '../../_common/button/Button';
import { ButtonProps } from '@navikt/ds-react';

import style from './ButtonPart.module.scss';

const legacySizeToSize: Record<ButtonPartSizePropLegacy, ButtonProps['size']> =
    {
        kompakt: 'small',
        mini: 'small',
        normal: 'medium',
    };

const typePropToVariant: Record<ButtonPartTypeProp, ButtonProps['variant']> = {
    hoved: 'primary',
    standard: 'secondary',
    flat: 'tertiary',
    fare: 'danger',
};

const getButtonSize = (
    size: ButtonPartSizePropLegacy | ButtonPartSizeProp
): ButtonProps['size'] => legacySizeToSize[size] || size;

export const ButtonPart = ({ config }: ButtonPartProps) => {
    const { icon, link, size, type, fullwidth } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Button
            className={style.button}
            href={linkProps.url}
            variant={typePropToVariant[type]}
            xpIcon={icon}
            size={getButtonSize(size)}
            fullWidth={fullwidth}
        >
            {linkProps.text}
        </Button>
    );
};
