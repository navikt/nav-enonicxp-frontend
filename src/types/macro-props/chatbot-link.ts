import { MacroPropsCommon, MacroType } from './_macros-common';

export interface ChatbotLinkMacroProps extends MacroPropsCommon {
    name: MacroType.ChevronLinkExternal;
    config: {
        chatbot_link: {
            text: string;
        };
    };
}
