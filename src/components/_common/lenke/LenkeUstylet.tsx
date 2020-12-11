import React from 'react';
import { xpPathToAppPath, isXpPath } from '../../../utils/paths';
import { logLinkClick } from '../../../utils/amplitude';
import Link from 'next/link';

type Props = {
    href: string;
    onClick?: (e: React.MouseEvent) => void;
    component?: string;
    linkGroup?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeUstylet = ({
    href,
    onClick,
    component,
    linkGroup,
    analyticsLabel,
    children,
    ...rest
}: Props) => {
    const isInternalLink = isXpPath(href);
    const _href = (isInternalLink ? xpPathToAppPath(href) : href) || '/';
    const analyticsLinkText =
        analyticsLabel || (typeof children === 'string' ? children : undefined);

    const linkElement = (
        <a
            href={_href}
            onClick={(e) => {
                logLinkClick(_href, analyticsLinkText, component, linkGroup);
                onClick?.(e);
            }}
            {...rest}
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
