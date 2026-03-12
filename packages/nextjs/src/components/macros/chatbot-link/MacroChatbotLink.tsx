import React from 'react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { MacroChatbotLinkProps } from 'types/macro-props/chatbot-link';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { Knapp } from 'components/_common/knapp/Knapp';

type ExtraProps = {
    variant?: 'secondary';
};

export const MacroChatbotLink = ({ config }: MacroChatbotLinkProps) => {
    if (!config?.chatbot_link) {
        return null;
    }

    const { text, presentation = 'link' } = config.chatbot_link;

    const Element = presentation === 'link' ? LenkeInline : Knapp;
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
