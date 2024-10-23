import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroVarselBoksProps extends MacroPropsCommon {
    name: MacroType.VarselBoks;
    config: {
        varselBoks: {
            varselBoks: string;
        };
    };
}
