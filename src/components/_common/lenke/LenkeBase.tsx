import React from 'react';
import {
    isAppUrl,
    isNofollowUrl,
    isInternalUrl,
    getInternalRelativePath,
} from 'utils/urls';
import { logLinkClick } from 'utils/amplitude';
import Link from 'next/link';
import { usePathMap } from '../../../store/hooks/usePathMap';
import { PathMap } from '../../../types/content-props/_content-common';

const getFinalHref = (href: string, pathMap: PathMap) => {
    if (isInternalUrl(href)) {
        const internalPath = getInternalRelativePath(href);
        return pathMap[internalPath] || internalPath;
    }

    return href || '/';
};

type Props = {
    href: string;
    onClick?: (e: React.MouseEvent) => void;
    component?: string;
    linkGroup?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeBase = ({
    href,
    onClick,
    component,
    linkGroup,
    analyticsLabel,
    children,
    ...rest
}: Props) => {
    const { internalPathToCustomPath } = usePathMap();

    const finalHref = getFinalHref(href, internalPathToCustomPath);

    const analyticsLinkText =
        analyticsLabel || (typeof children === 'string' ? children : undefined);

    const linkElement = (
        <a
            href={finalHref}
            onClick={(e) => {
                logLinkClick(
                    finalHref,
                    analyticsLinkText,
                    component,
                    linkGroup
                );
                onClick?.(e);
            }}
            rel={isNofollowUrl(finalHref) ? 'nofollow' : undefined}
            {...rest}
        >
            {children}
        </a>
    );

    return isAppUrl(finalHref) ? (
        <Link href={finalHref} passHref={true}>
            {linkElement}
        </Link>
    ) : (
        linkElement
    );
};
