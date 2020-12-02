import { ContentProps, ContentType } from './_content-common';

export type PublishingCalendarChildren = ContentProps & {
    displayName: string;
    data: {
        date: string;
        period: string;
    };
};

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
}
