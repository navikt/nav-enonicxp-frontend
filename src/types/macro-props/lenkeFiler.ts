import { MacroPropsCommon, MacroName } from './_macros-common';

export interface LenkeFilerMacroProps extends MacroPropsCommon {
    name: MacroName.LenkeFiler;
    config: {
        lenkeFiler: {
            text: string;
            files: { _path: string }[];
        };
    };
}
