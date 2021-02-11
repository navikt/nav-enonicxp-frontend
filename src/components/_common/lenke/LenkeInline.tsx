import React from 'react';
import { LenkeBase } from './LenkeBase';

type Props = {
    href: string;
    className?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeInline = ({ href, className, children, ...rest }: Props) => (
    <LenkeBase href={href} className={`lenke ${className || ''}`} {...rest}>
        {children}
    </LenkeBase>
);
