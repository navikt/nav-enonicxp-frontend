import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { XpImageProps } from '../../../types/media';
import { XpImage } from '../image/XpImage';
import { KnappBaseProps } from 'nav-frontend-knapper';

const bem = BEM('knapp');

type Props = {
    href?: string;
    type?: KnappBaseProps['type'];
    icon?: XpImageProps;
    mini?: boolean;
    kompakt?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    prefetch?: boolean;
    onClick?: (e?: React.MouseEvent) => void;
    className?: string;
    children: React.ReactNode;
};

export const Button = ({
    href = '#',
    type = 'standard',
    icon,
    mini,
    kompakt,
    fullWidth,
    disabled,
    prefetch,
    onClick,
    className,
    children,
}: Props) => {
    return (
        <LenkeBase
            href={href}
            className={classNames(
                bem(),
                bem(undefined, type),
                bem('custom'),
                mini && bem(undefined, 'mini'),
                kompakt && bem(undefined, 'kompakt'),
                fullWidth && bem(undefined, 'fullWidth'),
                disabled && bem(undefined, 'disabled'),
                className
            )}
            onClick={onClick}
            prefetch={prefetch}
        >
            {icon ? (
                <>
                    <XpImage
                        imageProps={icon}
                        className={bem('icon')}
                        alt={''}
                    />
                    <span>{children}</span>
                </>
            ) : (
                <>{children}</>
            )}
        </LenkeBase>
    );
};
