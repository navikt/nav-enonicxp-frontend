import React from 'react';
import { Alert, AlertProps } from '@navikt/ds-react';
import { classNames } from '../../../utils/classnames';
import './AlertStripe.less';

type Props = {
    variant: AlertProps['variant'];
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
            variant={variant}
            size={size}
            className={classNames('alert-part', className)}
            {...rest}
        >
            {children}
        </Alert>
    );
};
