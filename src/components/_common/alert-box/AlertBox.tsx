import React from 'react';
import { Alert, AlertProps } from '@navikt/ds-react';
import { classNames } from '../../../utils/classnames';

// These types were used by a previous version of the design system component
type AlertTypeLegacy = 'info' | 'advarsel' | 'feil' | 'suksess';

type Variant = AlertProps['variant'];

const legacyTypeToVariant: {
    [type in AlertTypeLegacy]: Variant;
} = {
    info: 'info',
    advarsel: 'warning',
    feil: 'error',
    suksess: 'success',
};

type Props = {
    variant: Variant | AlertTypeLegacy;
    size?: AlertProps['size'];
    inline?: AlertProps['inline'];
    className?: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const AlertBox = ({
    variant,
    size,
    inline,
    className,
    children,
    ...rest
}: Props) => {
    return (
        <Alert
            variant={legacyTypeToVariant[variant] || variant}
            size={size}
            inline={inline}
            className={classNames('alert-box', className)}
            {...rest}
        >
            {children}
        </Alert>
    );
};
