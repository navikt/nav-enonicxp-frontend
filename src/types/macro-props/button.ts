import { MacroPropsCommon, MacroType } from './_macros-common';

interface ButtonMacroProps extends MacroPropsCommon {
    descriptor: MacroType.Button | MacroType.ButtonBlue;
    config: {
        url: string;
        text: string;
        content: string;
    };
}
