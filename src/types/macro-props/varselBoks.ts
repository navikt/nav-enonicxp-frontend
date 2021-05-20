import { MacroPropsCommon, MacroType } from './_macros-common';

interface VarselBoksMacroProps extends MacroPropsCommon {
    descriptor: MacroType.VarselBoks;
    config: {
        varselBoks: string;
    };
}
