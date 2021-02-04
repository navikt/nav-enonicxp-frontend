import React from 'react';
import { LenkeUstylet } from './LenkeUstylet';
import { getUrlFromLookupTable } from 'utils/url-lookup-table';

type Props = {
    href: string;
    className?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeInline = ({ href, className, children, ...rest }: Props) => {
    const _href = getUrlFromLookupTable(href);
    return (
        <LenkeUstylet
            href={_href}
            className={`lenke ${className || ''}`}
            {...rest}
        >
            {children}
        </LenkeUstylet>
    );
};
