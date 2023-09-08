import React from 'react';
import {
    ButtonPartProps,
    ButtonPartSizeProp,
    ButtonPartTypeProp,
} from 'types/component-props/parts/button';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Button } from '../../_common/button/Button';
import { ButtonProps } from '@navikt/ds-react';

import style from './ButtonPart.module.scss';

const buttonPartSizeToDsSize: Record<ButtonPartSizeProp, ButtonProps['size']> =
    {
        kompakt: 'small',
        mini: 'small',
        normal: 'medium',
        medium: 'medium',
        small: 'small',
    } as const;

const typePropToVariant: Record<ButtonPartTypeProp, ButtonProps['variant']> = {
    hoved: 'primary',
    standard: 'secondary',
    flat: 'tertiary',
    fare: 'danger',
} as const;

export const ButtonPart = ({ config }: ButtonPartProps) => {
    const { icon, link, size, type, fullwidth } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <Button
            className={style.button}
            href={linkProps.url}
            variant={typePropToVariant[type]}
            xpIcon={icon}
            size={buttonPartSizeToDsSize[size]}
            fullWidth={fullwidth}
        >
            {linkProps.text}
        </Button>
    );
};
