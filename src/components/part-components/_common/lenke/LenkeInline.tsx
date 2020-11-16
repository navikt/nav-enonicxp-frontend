import React from 'react';
import { LenkeUstylet } from './LenkeUstylet';

type Props = {
    href: string;
    className?: string;
    id?: string;
    onClick?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};

export const LenkeInline = ({
    href,
    className,
    id,
    onClick,
    children,
}: Props) => {
    return (
        <LenkeUstylet
            href={href}
            className={`lenke ${className || ''}`}
            id={id}
            onClick={onClick}
        >
            {children}
        </LenkeUstylet>
    );
};
