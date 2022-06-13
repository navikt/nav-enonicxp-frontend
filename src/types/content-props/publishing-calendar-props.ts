import { ContentType, CustomContentCommonProps } from './_content-common';

export type PublishingCalendarChildren = CustomContentCommonProps & {
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

export interface PublishingCalendarProps extends CustomContentCommonProps {
    __typename: ContentType.PublishingCalendar;
    children: PublishingCalendarChildren[];
    data: PublishingCalendarData;
}
