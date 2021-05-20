import { MacroPropsCommon, MacroType } from './_macros-common';

interface LenkeFilerMacroProps extends MacroPropsCommon {
    descriptor: MacroType.LenkeFiler;
    config: {
        text: string;
        files: string[];
    };
}
