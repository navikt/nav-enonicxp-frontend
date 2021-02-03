import React, { useEffect } from 'react';
import { xpPathToPathname, isInternalUrl } from 'utils/paths';
import { logLinkClick } from 'utils/amplitude';
import Link from 'next/link';
import { useAppContext } from '../../../pages/_app';
import { getUrlFromLookupTable } from '../../../utils/url-lookup-table';

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
    const { urlLookupTable } = useAppContext();
    const pathOrUrl = xpPathToPathname(href) || '/';
    const _href = getUrlFromLookupTable(pathOrUrl, urlLookupTable);

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
