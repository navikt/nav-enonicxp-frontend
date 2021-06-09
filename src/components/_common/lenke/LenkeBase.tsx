import React from 'react';
import { isNofollowUrl, getInternalRelativePath, isAppUrl } from 'utils/urls';
import { logLinkClick } from 'utils/amplitude';
import Link from 'next/link';
import { usePathMap } from '../../../store/hooks/usePathMap';

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
    const isInternalLink = isAppUrl(href);

    const getFinalHref = () => {
        if (isInternalLink) {
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

    return isInternalLink ? (
        <Link href={finalHref} passHref={true}>
            {linkElement}
        </Link>
    ) : (
        linkElement
    );
};
