import { MacroPropsCommon, MacroType } from './_macros-common';

interface ChevronLinkExternalMacroProps extends MacroPropsCommon {
    descriptor: MacroType.ChevronLinkExternal;
    config: {
        url: string;
        text: string;
    };
}
