import React from 'react';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Button } from 'components/_common/button/Button';
import { ButtonProps } from '@navikt/ds-react';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { LinkSelectable } from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';

import style from './ButtonPart.module.scss';

type ButtonPartSizePropLegacy = 'normal' | 'kompakt' | 'mini';
type ButtonPartSizeProp = 'medium' | 'small';
type ButtonPartTypeProp = 'standard' | 'hoved' | 'fare' | 'flat';

type ButtonSizePart = PartConfigButton['size'];
type ButtonSizeAksel = ButtonProps['size'];

type ButtonTypePart = PartConfigButton['type'];
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

export type PartConfigButton = {
    link: LinkSelectable;
    type: ButtonPartTypeProp;
    size: ButtonPartSizePropLegacy | ButtonPartSizeProp;
    icon?: XpImageProps;
    fullwidth: boolean;
};

export const ButtonPart = ({ config }: PartComponentProps<PartType.Button>) => {
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
