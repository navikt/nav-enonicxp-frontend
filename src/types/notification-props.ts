import { ContentType, ContentProps } from './content-props/_content-common';

export type NotificationType = 'warning' | 'info';

export interface NotificationProps extends ContentProps {
    __typename: ContentType.Notification;
    data: {
        type: NotificationType;
        title: string;
        showDescription: boolean;
        showUpdated: boolean;
        target: ContentProps;
    };
}
