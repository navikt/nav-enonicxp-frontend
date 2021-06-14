import React from 'react';
import { BEM, classNames } from '../../../../../utils/classnames';
import { useGvEditorState } from '../../../../../store/hooks/useGvEditorState';
import { GVButton } from '../button/GVButton';
import './GVMessages.less';

const bem = BEM('gv-messages');

export type GVMessageProps = {
    level: 'info' | 'warning' | 'error';
    message: React.ReactNode;
};

export const GVMessages = () => {
    const { messages, setMessages } = useGvEditorState();

    if (messages.length === 0) {
        return null;
    }

    return (
        <div className={bem()}>
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
            <GVButton
                className={bem('close')}
                onClick={(e) => {
                    e.preventDefault();
                    setMessages([]);
                }}
            >
                {'Lukk meldinger'}
            </GVButton>
        </div>
    );
};
