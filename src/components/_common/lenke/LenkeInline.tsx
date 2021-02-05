import React from 'react';
import { LenkeUstylet } from './LenkeUstylet';

type Props = {
    href: string;
    className?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeInline = ({ href, className, children, ...rest }: Props) => (
    <LenkeUstylet href={href} className={`lenke ${className || ''}`} {...rest}>
        {children}
    </LenkeUstylet>
);
