import React from 'react';
import { NotificationProps } from 'types/notification-props';
import Notification from './Notification';
import { Language, translator } from 'translations';
import './GlobalNotifications.less';

type Props = {
    language: Language;
    notifications: NotificationProps[];
};

export const GlobalNotifications = ({
    notifications = [],
    language,
}: Props) => {
    const getLabel = translator('notifications', language);
    return notifications.length > 0 ? (
        <section
            className={'global-notifications'}
            aria-label={getLabel('label')}
        >
            <div className={'global-notifications-inner'}>
                {notifications.map((props, index) => (
                    <Notification {...props} key={index} />
                ))}
            </div>
        </section>
    ) : null;
};

export default GlobalNotifications;
