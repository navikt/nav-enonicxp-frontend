import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroTallProps extends MacroPropsCommon {
    name: MacroType.Tall;
    config: {
        tall: {
            verdi: number;
            decimals?: number;
        };
    };
}
