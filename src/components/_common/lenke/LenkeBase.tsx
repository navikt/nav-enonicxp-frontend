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
import { usePageConfig } from '../../../store/hooks/usePageConfig';

/**
 * This component handles client-side async navigation for URLs internal to this app (as well as analytics for links)
 * This is necessary as there are many other apps sharing the nav.no domain, and attempting async navigation to other
 * apps may result in errors
 **/

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
    const { pageConfig } = usePageConfig();

    // Setting prefetch=true on next/link is deprecated, hence this strange thing (true is default)
    // (setting to always false for the time being to prevent backend load spikes with cold cache)
    const shouldPrefetch = false;
    // prefetch === false || !!pageConfig.editorView ? false : undefined;

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
        <Link href={finalHref} passHref={true} prefetch={shouldPrefetch}>
            {linkElement}
        </Link>
    ) : (
        linkElement
    );
};
