import React from 'react';
import { NotificationProps } from '../../../types/content-types/notification-props';
import Notification from './Notification';

type Props = {
    notifications: NotificationProps[];
};

export const GlobalNotifications = ({ notifications }: Props) => {
    return (
        <div className={'global-notifications'}>
            {notifications.map((props) => (
                <Notification {...props} />
            ))}
        </div>
    );
};

export default GlobalNotifications;
