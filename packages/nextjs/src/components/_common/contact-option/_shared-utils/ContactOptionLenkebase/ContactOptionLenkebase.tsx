import React from 'react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AnalyticsEvents } from 'utils/analytics';
import style from './ContactOptionLenkebase.module.scss';

interface Props {
    href: string;
    analyticsLinkGroup?: string;
    analyticsComponent?: string;
    analyticsEvent?: AnalyticsEvents;
    children: React.ReactNode;
}

export const ContactOptionLenkebase = ({
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
