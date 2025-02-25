import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroGlobalValueProps extends MacroPropsCommon {
    name: MacroType.GlobalValue;
    config: {
        global_value: {
            value: string;
            decimals?: number;
        };
    };
}
