import React from 'react';
import { LenkeBase } from '../../../../_common/lenke/LenkeBase';

type Props = React.ComponentProps<typeof LenkeBase> & {
    navigate: (path: string) => void;
};

export const IndexPageLink = ({
    href,
    onClick,
    children,
    navigate,
    ...rest
}: Props) => {
    return (
        <LenkeBase
            {...rest}
            href={href}
            onClick={(e) => {
                onClick?.(e);
                e.preventDefault();
                navigate(href);
            }}
        >
            {children}
        </LenkeBase>
    );
};
