import { ContentProps, ContentType, SeoDataProps } from './_content-common';

export type PublishingCalendarChildren = ContentProps & {
    displayName: string;
    data: {
        date: string;
        period: string;
    };
};

export type PublishingCalendarData = Partial<{
    ingress: string;
}> &
    SeoDataProps;

export interface PublishingCalendarEntries {
    displayName: string;
    period: string;
    publDate: Date;
    day: string;
    month: string;
}

export interface PublishingCalendarProps extends ContentProps {
    __typename: ContentType.PublishingCalendar;
    children: PublishingCalendarChildren[];
    data: PublishingCalendarData;
}
