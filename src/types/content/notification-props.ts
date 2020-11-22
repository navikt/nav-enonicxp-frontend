import { ContentType, ContentTypeProps, GlobalContentProps } from './_common';

export type NotificationType = 'warning' | 'info';

export interface NotificationProps extends GlobalContentProps {
    __typename: ContentType.Notification;
    data: {
        type: NotificationType;
        title: string;
        showDescription: boolean;
        showUpdated: boolean;
        target: ContentTypeProps;
    };
}
