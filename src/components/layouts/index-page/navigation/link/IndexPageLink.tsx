import React from 'react';
import { LenkeBase } from '../../../../_common/lenke/LenkeBase';
import { useIndexPageNavigation } from '../../useIndexPageRouting';

type Props = React.ComponentProps<typeof LenkeBase>;

export const IndexPageLink = ({ href, onClick, children, ...rest }: Props) => {
    const { navigate, indexPages } = useIndexPageNavigation();

    return (
        <LenkeBase
            {...rest}
            href={href}
            onClick={(e) => {
                onClick?.(e);

                if (indexPages.has(href)) {
                    e.preventDefault();
                    navigate(href);
                }
            }}
        >
            {children}
        </LenkeBase>
    );
};
