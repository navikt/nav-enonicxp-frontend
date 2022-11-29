import { ContentType, ContentCommonProps } from './_content-common';

export type PublishingCalendarEntryProps
    = ContentCommonProps & {
    displayName: string;
    data: {
        date: string;
        period: string;
    };
};

export type PublishingCalendarData = Partial<{
    ingress: string;
}>;

export interface PublishingCalendarProps extends ContentCommonProps {
    __typename: ContentType.PublishingCalendar;
    children: PublishingCalendarEntryProps[];
    data: PublishingCalendarData;
}
