import React from 'react';
import { LenkeInline } from '../../../../_common/lenke/LenkeInline';

type Props = {
    children: React.ReactNode;
    href: string;
};

export const SiteInfoLink = ({ href, children }: Props) => {
    return (
        <LenkeInline
            href={href}
            target={'_blank'}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {children}
        </LenkeInline>
    );
};
