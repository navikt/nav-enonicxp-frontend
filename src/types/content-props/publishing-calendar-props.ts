import { ContentType, ContentCommonProps } from './_content-common';

export type PublishingCalendarChildren = ContentCommonProps & {
    displayName: string;
    data: {
        date: string;
        period: string;
    };
};

export type PublishingCalendarData = Partial<{
    ingress: string;
}>;

export interface PublishingCalendarEntries {
    displayName: string;
    period: string;
    publDate: Date;
    day: string;
    month: string;
}

export interface PublishingCalendarProps extends ContentCommonProps {
    __typename: ContentType.PublishingCalendar;
    children: PublishingCalendarChildren[];
    data: PublishingCalendarData;
}
