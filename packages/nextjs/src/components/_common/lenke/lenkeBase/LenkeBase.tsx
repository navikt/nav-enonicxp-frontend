import React, { Fragment } from 'react';
import Link from 'next/link';
import { adminOrigin, isNofollowUrl, xpDraftPathPrefix } from 'utils/urls';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { onlyText } from 'utils/react-children';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { usePublicUrl } from 'utils/usePublicUrl';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';

import style from './LenkeBase.module.scss';

export const adminPreviewUrlPrefix = `${adminOrigin}${xpDraftPathPrefix}`;

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
    shallow?: boolean;
    prefetch?: boolean;
    analyticsEvent?: AnalyticsEvents;
    analyticsComponent?: string;
    analyticsLinkGroup?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeBase = ({
    href,
    shallow,
    onClick,
    analyticsEvent,
    analyticsComponent,
    analyticsLinkGroup,
    analyticsLabel,
    prefetch,
    children,
    ...rest
}: Props) => {
    const contentProps = usePageContentProps();
    const { editorView } = contentProps;
    const { context } = getDecoratorParams(contentProps);
    const { layoutConfig } = useLayoutConfig();
    const { url, canRouteClientSide } = usePublicUrl(href);
    const analyticsData = {
        komponent: analyticsComponent,
        lenkegruppe: analyticsLinkGroup,
        seksjon: analyticsLinkGroup ?? layoutConfig.title,
        destinasjon: url,
        lenketekst: analyticsLabel ?? onlyText(children),
        målgruppe: context,
        innholdstype: innholdsTypeMap[contentProps.type],
    };

    const WrapperComponent =
        editorView === 'edit' && href?.startsWith(adminPreviewUrlPrefix)
            ? BadLinkWarning
            : Fragment;

    const LinkComponent = canRouteClientSide ? Link : 'a';

    // Setting prefetch=true on next/link is deprecated, hence this strange thing (true is default)
    const shouldPrefetch =
        canRouteClientSide && (prefetch === false || editorView) ? false : undefined;

    return (
        <WrapperComponent>
            <LinkComponent
                {...rest}
                href={url}
                onClick={(e) => {
                    logAnalyticsEvent(analyticsEvent ?? AnalyticsEvents.NAVIGATION, analyticsData);
                    onClick?.(e);
                }}
                shallow={shallow}
                rel={isNofollowUrl(url) ? 'nofollow' : undefined}
                prefetch={shouldPrefetch}
            >
                {children}
            </LinkComponent>
        </WrapperComponent>
    );
};
