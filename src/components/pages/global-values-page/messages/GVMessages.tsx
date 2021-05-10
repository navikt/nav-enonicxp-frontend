import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import './GVMessages.less';

const bem = BEM('global-values-messages');

export type MessageProps = {
    level: 'info' | 'warning' | 'error';
    message: string;
};

const getHighestErrorLevel = (messages: MessageProps[]) =>
    messages?.reduce(
        (highestLevel, msg) =>
            msg.level === 'error' || highestLevel === 'error'
                ? 'error'
                : msg.level === 'warning'
                ? 'warning'
                : highestLevel,
        'info'
    );

type Props = {
    messages: MessageProps[];
};

export const GVMessages = ({ messages }: Props) => {
    if (messages.length === 0) {
        return null;
    }

    const highestErrorLevel = getHighestErrorLevel(messages);

    return (
        <div className={classNames(bem(), bem(undefined, highestErrorLevel))}>
            {messages.map((msg, index) => (
                <div
                    className={classNames(
                        bem('message'),
                        bem('message', msg.level)
                    )}
                    key={index}
                >
                    {msg.message}
                </div>
            ))}
        </div>
    );
};
