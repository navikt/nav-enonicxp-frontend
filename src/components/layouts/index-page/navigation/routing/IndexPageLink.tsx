import React from 'react';
import { LenkeBase } from '../../../../_common/lenke/LenkeBase';
import { IndexPageNavigationCallback } from './useIndexPageRouting';

type Props = React.ComponentProps<typeof LenkeBase> & {
    navigate: IndexPageNavigationCallback;
    header: string;
};

export const IndexPageLink = ({
    href,
    onClick,
    header,
    children,
    navigate,
    ...rest
}: Props) => {
    return (
        <LenkeBase
            {...rest}
            href={href}
            component={'Områdenavigasjon'}
            linkGroup={header}
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
