import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroVarselBoksProps extends MacroPropsCommon {
    name: MacroType.VarselBoksDeprecated;
    config: {
        varselBoks: {
            varselBoks: string;
        };
    };
}
