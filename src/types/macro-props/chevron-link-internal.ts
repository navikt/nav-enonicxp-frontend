import { MacroPropsCommon, MacroType } from './_macros-common';

interface ChevronLinkInternalMacroProps extends MacroPropsCommon {
    descriptor: MacroType.ChevronLinkInternal;
    config: {
        target: string;
        text: string;
    };
}
