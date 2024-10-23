import React from 'react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { MacroChatbotLinkProps } from 'types/macro-props/chatbot-link';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { Button } from 'components/_common/button/Button';

type ExtraProps = {
    variant?: 'secondary';
};

export const MacroChatbotLink = ({ config }: MacroChatbotLinkProps) => {
    if (!config?.chatbot_link) {
        return null;
    }

    const { text, presentation = 'link' } = config.chatbot_link;

    const Element = presentation === 'link' ? LenkeInline : Button;
    const extraProps: ExtraProps = presentation === 'link' ? {} : { variant: 'secondary' };

    return (
        <Element
            href={'/'}
            onClick={(e) => {
                e.preventDefault();
                openChatbot();
            }}
            {...extraProps}
        >
            {text}
        </Element>
    );
};
