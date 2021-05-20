import React from 'react';
import { ChatbotLinkMacroProps } from '../../../types/macro-props/chatbot-link';
import { LenkeInline } from '../../_common/lenke/LenkeInline';

const openChatbot = (e: React.MouseEvent) => {
    e.preventDefault();
    const chatButton = document.getElementById('chatbot-frida-knapp');
    chatButton?.click?.();
};

export const MacroChatbotLink = ({ config }: ChatbotLinkMacroProps) => {
    if (!config?.chatbot_link) {
        return null;
    }

    const { text } = config.chatbot_link;

    return (
        <LenkeInline href={'/'} onClick={openChatbot}>
            {text}
        </LenkeInline>
    );
};
