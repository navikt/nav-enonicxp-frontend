import React from 'react';
import { Alert, AlertProps } from '@navikt/ds-react';
import { classNames } from '../../../utils/classnames';
import './AlertStripe.less';

export type AlertTypeLegacy = 'info' | 'advarsel' | 'feil' | 'suksess';

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
    className?: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const AlertStripe = ({
    variant,
    size,
    className,
    children,
    ...rest
}: Props) => {
    return (
        <Alert
            variant={legacyTypeToVariant[variant] || variant}
            size={size}
            className={classNames('alert-stripe', className)}
            {...rest}
        >
            {children}
        </Alert>
    );
};
