import React from 'react';
import Link from 'next/link';
import { isNofollowUrl, isAppUrl } from 'utils/urls';
import { analyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { onlyText } from 'utils/react-children';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { usePublicHref } from '../../../utils/usePublicHref';

/**
 * This component handles client-side async navigation for URLs internal to this app (as well as analytics for links)
 * This is necessary as there are many other apps sharing the nav.no domain, and attempting async navigation to other
 * apps may result in errors
 **/
type Props = {
    href: string;
    onClick?: (e: React.MouseEvent) => void;
    event?: analyticsEvents;
    component?: string;
    linkGroup?: string;
    analyticsLabel?: string;
    prefetch?: boolean;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeBase = ({
    href,
    onClick,
    event,
    component,
    linkGroup,
    analyticsLabel,
    prefetch,
    children,
    ...rest
}: Props) => {
    const { layoutConfig } = useLayoutConfig();

    // Setting prefetch=true on next/link is deprecated, hence this strange thing (true is default)
    // (setting to always false for the time being to prevent backend load spikes with cold cache)
    const shouldPrefetch = false;
    // prefetch === false || !!pageConfig.editorView ? false : undefined;

    const finalHref = usePublicHref(href);
    const analyticsData = {
        komponent: component,
        lenkegruppe: linkGroup,
        seksjon: linkGroup || layoutConfig.title,
        destinasjon: finalHref,
        lenketekst: analyticsLabel || onlyText(children),
    };
    const linkElement = (
        <a
            href={finalHref}
            onClick={(e) => {
                logAmplitudeEvent(
                    event || analyticsEvents.NAVIGATION,
                    analyticsData
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
