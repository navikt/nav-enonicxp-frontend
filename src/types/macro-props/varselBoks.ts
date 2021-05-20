import { MacroPropsCommon, MacroName } from './_macros-common';

export interface VarselBoksMacroProps extends MacroPropsCommon {
    name: MacroName.VarselBoks;
    config: {
        varselBoks: {
            varselBoks: string;
        };
    };
}
