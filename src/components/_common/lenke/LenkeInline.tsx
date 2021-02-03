import React from 'react';
import { LenkeUstylet } from './LenkeUstylet';
import { getUrlFromLookupTable } from '../../../utils/url-lookup-table';
import { useAppContext } from '../../../pages/_app';

type Props = {
    href: string;
    className?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeInline = ({ href, className, children, ...rest }: Props) => {
    const { urlLookupTable } = useAppContext();
    const _href = getUrlFromLookupTable(href, urlLookupTable);
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
