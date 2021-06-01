import React from 'react';
import Notification from './Notification';
import { translator } from 'translations';
import { BEM, classNames } from '../../../utils/classnames';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { getContentLanguages } from '../../../utils/languages';
import './TopContainer.less';

const bem = BEM('top-container');

type Props = {
    content: ContentProps;
};

export const TopContainer = ({ content }: Props) => {
    const { __typename, notifications, language, breadcrumbs } = content;

    const hasDecoratorWidgets =
        breadcrumbs?.length > 0 || getContentLanguages(content)?.length > 0;

    const hasContentWithWhiteHeader = __typename === ContentType.ProductPage;

    const getLabel = translator('notifications', language);

    return (
        <div
            className={classNames(
                bem(),
                hasContentWithWhiteHeader && bem(undefined, 'white'),
                hasDecoratorWidgets && bem(undefined, 'widgets-offset')
            )}
        >
            {notifications?.length > 0 && (
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
