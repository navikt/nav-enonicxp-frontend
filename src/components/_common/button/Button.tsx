import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { XpImageProps } from '../../../types/media';
import { XpImage } from '../image/XpImage';
import { Button as DsButton } from '@navikt/ds-react';
import { ButtonProps } from '@navikt/ds-react/src/button/Button';

const bem = BEM('button');

type LegacyType = 'standard' | 'hoved' | 'fare' | 'flat';
type Variant = ButtonProps['variant'];

const legacyTypeToVariant: { [type in LegacyType]: Variant } = {
    hoved: 'primary',
    standard: 'secondary',
    flat: 'tertiary',
    fare: 'danger',
};

type Props = {
    href?: string;
    type?: Variant | LegacyType;
    icon?: XpImageProps;
    mini?: boolean;
    kompakt?: boolean;
    size?: ButtonProps['size'];
    fullWidth?: boolean;
    disabled?: boolean;
    prefetch?: boolean;
    onClick?: (e?: React.MouseEvent) => void;
    className?: string;
    children: React.ReactNode;
};

export const Button = ({
    href,
    type = 'standard',
    icon,
    mini,
    kompakt,
    size,
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
            href={href}
            className={classNames(
                bem(),
                fullWidth && bem(undefined, 'fullWidth'),
                className
            )}
            onClick={(e) => {
                if (href) {
                    e.preventDefault();
                }
                onClick?.();
            }}
            prefetch={prefetch}
            variant={legacyTypeToVariant[type] || type}
            size={size || (mini || kompakt ? 'small' : 'medium')}
            disabled={disabled}
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
        </DsButton>
    );
};
