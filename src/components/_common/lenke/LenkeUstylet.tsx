import React from 'react';
import { xpPathToAppPath, isXpPath } from '../../../utils/paths';
import { logLinkClick } from '../../../utils/amplitude';
import Link from 'next/link';

type Props = {
    href: string;
    className?: string;
    component?: string;
    linkGroup?: string;
    id?: string;
    onClick?: (e: React.MouseEvent) => void;
    analyticsLabel?: string;
    children: React.ReactNode;
};

export const LenkeUstylet = ({
    href,
    className,
    component,
    linkGroup,
    id,
    onClick,
    analyticsLabel,
    children,
}: Props) => {
    const isInternalLink = isXpPath(href);
    const _href = (isInternalLink ? xpPathToAppPath(href) : href) || '/';
    const analyticsLinkText =
        analyticsLabel || (typeof children === 'string' ? children : undefined);

    const linkElement = (
        <a
            href={_href}
            className={className}
            id={id}
            onClick={(e) => {
                logLinkClick(_href, analyticsLinkText, component, linkGroup);
                onClick?.(e);
            }}
        >
            {children}
        </a>
    );

    return isInternalLink ? (
        <Link href={_href} passHref={true}>
            {linkElement}
        </Link>
    ) : (
        linkElement
    );
};
