import React from 'react';
import Notification from './notifications/Notification';
import { translator } from 'translations';
import { BEM, classNames } from '../../../utils/classnames';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { getContentLanguages } from '../../../utils/languages';
import './TopContainer.less';
import { VersionPicker } from './version-picker/VersionPicker';

const bem = BEM('top-container');

export const contentTypesWithWhiteHeader = {
    [ContentType.ProductPage]: true,
    [ContentType.SituationPage]: true,
};

const hideNotificationsForContentTypes: { [key in ContentType]?: boolean } = {
    [ContentType.LargeTable]: true,
    [ContentType.GlobalValues]: true,
    [ContentType.Fragment]: true,
};

type Props = {
    content: ContentProps;
};

export const TopContainer = ({ content }: Props) => {
    const { __typename, notifications, language, breadcrumbs } = content;

    const hasDecoratorWidgets =
        breadcrumbs?.length > 0 || getContentLanguages(content)?.length > 0;

    const hasWhiteHeader = contentTypesWithWhiteHeader[__typename];

    const showNotifications =
        !hideNotificationsForContentTypes[__typename] &&
        notifications?.length > 0;

    const showVersionPicker =
        content.editMode || (content.serverEnv && content.serverEnv !== 'prod');

    const getLabel = translator('notifications', language);

    return (
        <div
            className={classNames(
                bem(),
                contentTypesWithWhiteHeader[__typename] &&
                    bem(undefined, 'white'),
                hasWhiteHeader && bem(undefined, 'white'),
                hasDecoratorWidgets && bem(undefined, 'widgets-offset')
            )}
        >
            {showVersionPicker && <VersionPicker content={content} />}
            {showNotifications && (
                <section
                    className={bem('notifications')}
                    aria-label={getLabel('label')}
                >
                    {notifications.map((props, index) => (
                        <Notification {...props} key={index} />
                    ))}
                </section>
            )}
        </div>
    );
};

export default TopContainer;
