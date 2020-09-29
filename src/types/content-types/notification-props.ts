import { ContentType, ContentTypeSchema, GlobalSchema } from './_schema';

export type NotificationType = 'warning' | 'info';

export interface NotificationProps extends GlobalSchema {
    __typename: ContentType.Notification;
    data: {
        type: NotificationType;
        title: string;
        showDescription: boolean;
        showUpdated: boolean;
        target: ContentTypeSchema;
    };
}
