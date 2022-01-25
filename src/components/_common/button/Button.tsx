import React from 'react';
import { classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { XpImageProps } from '../../../types/media';
import { XpImage } from '../image/XpImage';
import { Button as DsButton, ButtonProps } from '@navikt/ds-react';
import style from './Button.module.scss';

type Props = {
    href?: string;
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
    icon?: XpImageProps;
    fullWidth?: boolean;
    disabled?: boolean;
    prefetch?: boolean;
    onClick?: (e?: React.MouseEvent) => void;
    className?: string;
    children: React.ReactNode;
};

export const Button = ({
    href,
    variant = 'secondary',
    size = 'medium',
    icon,
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
            href={href || '#'}
            className={classNames(
                style.button,
                fullWidth && style.buttonFullWidth,
                className
            )}
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
        >
            {icon ? (
                <>
                    <XpImage
                        imageProps={icon}
                        className={style.button__icon}
                        alt={''}
                    />
                    <span>{children}</span>
                </>
            ) : (
                <>{children}</>
            )}
        </DsButton>
    );
};
