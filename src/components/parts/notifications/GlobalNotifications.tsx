import React from 'react';
import { NotificationProps } from 'types/notification-props';
import Notification from './Notification';
import './GlobalNotifications.less';

type Props = {
    notifications: NotificationProps[];
};

export const GlobalNotifications = ({ notifications = [] }: Props) => {
    return notifications.length > 0 ? (
        <section className={'global-notifications'} aria-label={'Varsel'}>
            {notifications.map((props, index) => (
                <Notification {...props} key={index} />
            ))}
        </section>
    ) : null;
};

export default GlobalNotifications;
