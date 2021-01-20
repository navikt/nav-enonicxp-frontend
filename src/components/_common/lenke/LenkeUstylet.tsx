import React from 'react';
import { xpPathToPathname, isInternalUrl } from '../../../utils/paths';
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
    const _href = xpPathToPathname(href) || '/';
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

    return isInternalUrl(_href) ? (
        <Link href={_href} passHref={true}>
            {linkElement}
        </Link>
    ) : (
        linkElement
    );
};
