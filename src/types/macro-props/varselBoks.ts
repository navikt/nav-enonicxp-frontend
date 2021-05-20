import { MacroPropsCommon, MacroType } from './_macros-common';

export interface VarselBoksMacroProps extends MacroPropsCommon {
    name: MacroType.VarselBoks;
    config: {
        varselBoks: {
            varselBoks: string;
        };
    };
}
