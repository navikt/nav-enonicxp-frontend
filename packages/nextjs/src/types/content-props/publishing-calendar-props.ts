import { ContentType, ContentCommonProps } from './_content-common';

export type PublishingCalendarEntryProps = ContentCommonProps & {
    type: ContentType.PublishingCalendarEntry;
    displayName: string;
    data: {
        date: string;
        period: string;
        link?: {
            _path: string;
        };
    };
};

export type PublishingCalendarData = Partial<{
    ingress: string;
}>;

export type PublishingCalendarProps = ContentCommonProps & {
    type: ContentType.PublishingCalendar;
    children: PublishingCalendarEntryProps[];
    data: PublishingCalendarData;
};
