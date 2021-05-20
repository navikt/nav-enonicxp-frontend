import { MacroPropsCommon, MacroType } from './_macros-common';

export interface LenkeFilerMacroProps extends MacroPropsCommon {
    name: MacroType.LenkeFiler;
    config: {
        lenkeFiler: {
            text: string;
            files: { _path: string }[];
        };
    };
}
