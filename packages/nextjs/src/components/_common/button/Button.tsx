import React from 'react';
import { Button as DsButton, ButtonProps } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { XpImageProps } from 'types/media';
import { XpImage } from 'components/_common/image/XpImage';

import style from './Button.module.scss';

type Props = {
    href?: string;
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
    xpIcon?: XpImageProps;
    dsIcon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    disabled?: boolean;
    prefetch?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    children: React.ReactNode;
};

export const Button = ({
    href,
    variant = 'secondary',
    size = 'medium',
    xpIcon,
    dsIcon,
    iconPosition,
    fullWidth,
    disabled,
    prefetch,
    onClick,
    className,
    children,
}: Props) => {
    return (
        <DsButton
            as={LenkeBase}
            href={href ?? '#'}
            className={classNames(style.button, fullWidth && style.buttonFullWidth, className)}
            onClick={(e) => {
                if (!href) {
                    e.preventDefault();
                }
                onClick?.(e);
            }}
            prefetch={prefetch}
            variant={variant}
            size={size}
            disabled={disabled}
            icon={
                xpIcon ? (
                    <XpImage imageProps={xpIcon} className={style.button__icon} maxWidth={64} />
                ) : (
                    dsIcon
                )
            }
            iconPosition={iconPosition}
        >
            {children}
        </DsButton>
    );
};
