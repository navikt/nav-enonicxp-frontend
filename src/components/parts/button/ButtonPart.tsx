import React from 'react';
import { ButtonPartProps } from 'types/component-props/parts/button';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Button } from '../../_common/button/Button';
import { ButtonProps } from '@navikt/ds-react';

import style from './ButtonPart.module.scss';

type ButtonSizePart = ButtonPartProps['config']['size'];
type ButtonSizeAksel = ButtonProps['size'];

type ButtonTypePart = ButtonPartProps['config']['type'];
type ButtonTypeAksel = ButtonProps['variant'];

const partSizeToAkselSize: Record<ButtonSizePart, ButtonSizeAksel> = {
    kompakt: 'small',
    mini: 'small',
    normal: 'medium',
    medium: 'medium',
    small: 'small',
} as const;

const typePropToVariant: Record<ButtonTypePart, ButtonTypeAksel> = {
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
            xpIcon={icon}
            fullWidth={fullwidth}
            variant={typePropToVariant[type]}
            size={partSizeToAkselSize[size]}
        >
            {linkProps.text}
        </Button>
    );
};
