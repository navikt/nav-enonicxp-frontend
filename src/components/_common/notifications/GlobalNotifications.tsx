import React from 'react';
import { NotificationProps } from 'types/notification-props';
import Notification from './Notification';
import { Language, translator } from 'translations';
import './GlobalNotifications.less';
import { BEM, classNames } from '../../../utils/classnames';
import { LayoutType } from '../../../types/component-props/layouts';

type Props = {
    language: Language;
    notifications: NotificationProps[];
    pageLayoutDescriptior?: LayoutType;
};

const bem = BEM('global-notifications');

export const GlobalNotifications = ({
    pageLayoutDescriptior,
    notifications = [],
    language,
}: Props) => {
    const getLabel = translator('notifications', language);
    const whiteBackgroundLayouts = [LayoutType.PageWithSideMenus];
    const whiteBackground = whiteBackgroundLayouts.includes(
        pageLayoutDescriptior
    );

    const marginLayouts = [LayoutType.PageWithSideMenus];
    const margin = marginLayouts.includes(pageLayoutDescriptior);

    return notifications.length > 0 ? (
        <section
            aria-label={getLabel('label')}
            className={classNames(
                bem(),
                whiteBackground && bem('white'),
                margin && bem('padding')
            )}
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
