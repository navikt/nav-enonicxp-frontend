import React from 'react';
import { enonicPathToAppPath, isEnonicPath } from '../../../../utils/paths';
import { logLinkClick } from '../../../../utils/amplitude';
import Link from 'next/link';

type Props = {
    href: string;
    className?: string;
    id?: string;
    onClick?: (e: React.MouseEvent) => void;
    analyticsLabel?: string;
    children: React.ReactNode;
};

export const LenkeUstylet = ({
    href,
    className,
    id,
    onClick,
    analyticsLabel,
    children,
}: Props) => {
    const isInternalLink = isEnonicPath(href);
    const _href = (isInternalLink ? enonicPathToAppPath(href) : href) || '/';
    const analyticsLinkText =
        analyticsLabel || (typeof children === 'string' ? children : undefined);

    const linkElement = (
        <a
            href={_href}
            className={className}
            id={id}
            onClick={(e) => {
                logLinkClick(_href, analyticsLinkText);
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
