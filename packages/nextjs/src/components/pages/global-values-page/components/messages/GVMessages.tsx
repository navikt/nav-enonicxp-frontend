import React from 'react';
import { classNames } from 'utils/classnames';
import { useGvEditorState } from 'store/hooks/useGvEditorState';
import { GVButton } from 'components/pages/global-values-page/components/button/GVButton';

import style from './GVMessages.module.scss';

export type GVMessageProps = {
    level?: 'info' | 'warning' | 'error';
    message: React.ReactNode;
};

export const GVMessages = () => {
    const { messages, setMessages } = useGvEditorState();

    if (messages.length === 0) {
        return null;
    }
    return (
        <div className={style.gvMessages}>
            {messages.map((msg, index) => (
                <div className={classNames(msg.level ?? 'info', 'navds-body-long')} key={index}>
                    {msg.message}
                </div>
            ))}
            <GVButton
                className={style.close}
                onClick={() => {
                    setMessages([]);
                }}
            >
                {'Lukk'}
            </GVButton>
        </div>
    );
};
