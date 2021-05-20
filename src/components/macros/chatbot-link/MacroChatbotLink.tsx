import React from 'react';
import { ChevronLinkInternalMacroProps } from '../../../types/macro-props/chevron-link-internal';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { ChatbotLinkMacroProps } from '../../../types/macro-props/chatbot-link';

export const MacroChatbotLink = ({ config }: ChatbotLinkMacroProps) => {
    if (!config?.chatbot_link) {
        return null;
    }

    const { text } = config.chatbot_link;

    return null;
};
