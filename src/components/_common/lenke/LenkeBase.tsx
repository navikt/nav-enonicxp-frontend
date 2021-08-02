import React from 'react';
import {
    isNofollowUrl,
    getInternalRelativePath,
    isAppUrl,
    isInternalUrl,
} from 'utils/urls';
import { logLinkClick } from 'utils/amplitude';
import Link from 'next/link';
import { usePathMap } from '../../../store/hooks/usePathMap';

type Props = {
    href: string;
    onClick?: (e: React.MouseEvent) => void;
    component?: string;
    linkGroup?: string;
    analyticsLabel?: string;
    prefetch?: boolean;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeBase = ({
    href,
    onClick,
    component,
    linkGroup,
    analyticsLabel,
    prefetch,
    children,
    ...rest
}: Props) => {
    const { internalPathToCustomPath } = usePathMap();

    const getFinalHref = () => {
        if (isInternalUrl(href)) {
            const internalPath = getInternalRelativePath(href);
            return internalPathToCustomPath[internalPath] || internalPath;
        }

        return href || '/';
    };

    const finalHref = getFinalHref();

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

    return isAppUrl(href) ? (
        <Link href={finalHref} passHref={true} prefetch={prefetch}>
            {linkElement}
        </Link>
    ) : (
        linkElement
    );
};
