import React from 'react';
import { LenkeBase } from '../../../../_common/lenke/LenkeBase';
import { useIndexPageNavigation } from '../../useIndexPageRouting';

type Props = React.ComponentProps<typeof LenkeBase>;

export const IndexPageNavigationLink = ({ href, children, ...rest }: Props) => {
    const navigate = useIndexPageNavigation();

    return (
        <LenkeBase
            {...rest}
            href={href}
            onClick={(e) => {
                e.preventDefault();
                navigate(href);
            }}
        >
            {children}
        </LenkeBase>
    );
};
