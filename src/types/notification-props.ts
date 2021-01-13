import { ContentType, ContentProps } from './content-props/_content-common';
import { XpImage } from './media';

export type NotificationType = 'warning' | 'info';

export interface NotificationProps extends ContentProps {
    __typename: ContentType.Notification;
    data: Partial<{
        icon: XpImage;
        type: NotificationType;
        title: string;
        showDescription: boolean;
        showUpdated: boolean;
        target: ContentProps;
    }>;
}
