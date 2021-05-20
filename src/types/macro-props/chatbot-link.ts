import { MacroPropsCommon, MacroName } from './_macros-common';

export interface ChatbotLinkMacroProps extends MacroPropsCommon {
    name: MacroName.ChevronLinkExternal;
    config: {
        chatbot_link: {
            text: string;
        };
    };
}
