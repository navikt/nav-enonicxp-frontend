import React, { PropsWithChildren } from 'react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AnalyticsEvents } from 'utils/analytics';
import style from './KontaktOssKanalLenkebase.module.scss';

type Props = PropsWithChildren<{
    href: string;
    analyticsLinkGroup?: string;
    analyticsComponent?: string;
    analyticsEvent?: AnalyticsEvents;
}>;

export const KontaktOssKanalLenkebase = ({
    href,
    analyticsLinkGroup,
    analyticsComponent,
    analyticsEvent,
    children,
}: Props) => {
    return (
        <LenkeBase
            href={href}
            analyticsLinkGroup={analyticsLinkGroup}
            analyticsComponent={analyticsComponent}
            analyticsEvent={analyticsEvent}
            className={style.link}
        >
            {children}
        </LenkeBase>
    );
};
