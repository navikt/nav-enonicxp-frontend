import React from 'react';
import { NotificationProps } from 'types/content-types/notification-props';
import Notification from './Notification';
import './GlobalNotifications.less';

type Props = {
    notifications: NotificationProps[];
};

export const GlobalNotifications = ({ notifications = [] }: Props) => {
    return notifications.length > 0 ? (
        <div className={'global-notifications'}>
            {notifications.map((props, index) => (
                <Notification {...props} key={index} />
            ))}
        </div>
    ) : null;
};

export default GlobalNotifications;
