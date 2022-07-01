import React from 'react';
import { MacroChatbotLinkProps } from '../../../types/macro-props/chatbot-link';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';

export const MacroChatbotLink = ({ config }: MacroChatbotLinkProps) => {
    if (!config?.chatbot_link) {
        return null;
    }

    const { text } = config.chatbot_link;

    return (
        <LenkeInline
            href={'/'}
            onClick={(e) => {
                e.preventDefault();
                openChatbot();
            }}
        >
            {text}
        </LenkeInline>
    );
};
