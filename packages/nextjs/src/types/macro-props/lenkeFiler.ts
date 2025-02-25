import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroLenkeFilerProps extends MacroPropsCommon {
    name: MacroType.LenkeFiler;
    config: {
        lenkeFiler: {
            text: string;
            files: { _path: string }[];
        };
    };
}
