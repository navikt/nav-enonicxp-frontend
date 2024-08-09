import React from 'react';
import { Alert, AlertProps } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import style from './AlertBox.module.scss';

type Props = {
    variant: AlertProps['variant'];
    size?: AlertProps['size'];
    inline?: AlertProps['inline'];
    className?: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const role = {
    success: 'status',
    warning: 'status',
    info: undefined,
    error: 'alert',
};

export const AlertBox = ({ variant, size, inline, className, children, ...rest }: Props) => {
    return (
        <Alert
            {...rest}
            role={role[variant]}
            variant={variant}
            size={size}
            inline={inline}
            className={classNames(style.alertBox, className)}
        >
            {children}
        </Alert>
    );
};
