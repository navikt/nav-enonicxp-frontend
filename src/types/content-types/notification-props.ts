import { ContentType, ContentTypeSchema, GlobalContentSchema } from './_schema';

export type NotificationType = 'warning' | 'info';

export interface NotificationProps extends GlobalContentSchema {
    __typename: ContentType.Notification;
    data: {
        type: NotificationType;
        title: string;
        showDescription: boolean;
        showUpdated: boolean;
        target: ContentTypeSchema;
    };
}
