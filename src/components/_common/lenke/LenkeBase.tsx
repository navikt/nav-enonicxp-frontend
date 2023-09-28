import React, { Fragment } from 'react';
import Link from 'next/link';
import { adminOrigin, isNofollowUrl } from 'utils/urls';
import { xpPreviewBasePathDefault } from 'components/_editor-only/utils/editor-urls';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { onlyText } from 'utils/react-children';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { usePublicUrl } from 'utils/usePublicUrl';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './LenkeBase.module.scss';

const adminPreviewUrlPrefix = `${adminOrigin}${xpPreviewBasePathDefault}`;

const BadLinkWarning = ({ children }: { children: React.ReactNode }) => (
    <span className={style.badLinkWarning}>
        {'Obs! Lenke til portal-admin: '}
        {children}
    </span>
);

/**
 * This component handles client-side async navigation for URLs internal to this app (as well as analytics for links)
 * This is necessary as there are many other apps sharing the nav.no domain, and attempting async navigation to other
 * apps may result in errors
 **/
type Props = {
    href: string;
    onClick?: (e: React.MouseEvent) => void;
    prefetch?: boolean;
    analyticsEvent?: AnalyticsEvents;
    analyticsComponent?: string;
    analyticsLinkGroup?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeBase = ({
    href,
    onClick,
    analyticsEvent,
    analyticsComponent,
    analyticsLinkGroup,
    analyticsLabel,
    prefetch,
    children,
    ...rest
}: Props) => {
    const { pageConfig } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();

    const { url, canRouteClientSide } = usePublicUrl(href);
    const analyticsData = {
        komponent: analyticsComponent,
        lenkegruppe: analyticsLinkGroup,
        seksjon: analyticsLinkGroup || layoutConfig.title,
        destinasjon: url,
        lenketekst: analyticsLabel || onlyText(children),
    };

    const WrapperComponent =
        pageConfig.editorView === 'edit' &&
        href?.startsWith(adminPreviewUrlPrefix)
            ? BadLinkWarning
            : Fragment;

    const LinkComponent = canRouteClientSide ? Link : 'a';

    // Setting prefetch=true on next/link is deprecated, hence this strange thing (true is default)
    const shouldPrefetch =
        canRouteClientSide && (prefetch === false || pageConfig.editorView)
            ? false
            : undefined;

    return (
        <WrapperComponent>
            <LinkComponent
                {...rest}
                href={url}
                onClick={(e) => {
                    logAmplitudeEvent(
                        analyticsEvent || AnalyticsEvents.NAVIGATION,
                        analyticsData
                    );
                    onClick?.(e);
                }}
                rel={isNofollowUrl(url) ? 'nofollow' : undefined}
                prefetch={shouldPrefetch}
            >
                {children}
            </LinkComponent>
        </WrapperComponent>
    );
};
