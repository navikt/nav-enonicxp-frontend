import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroChatbotLinkProps extends MacroPropsCommon {
    name: MacroType.ChevronLinkExternal;
    config: {
        chatbot_link: {
            text: string;
            presentation: 'button' | 'link';
        };
    };
}
