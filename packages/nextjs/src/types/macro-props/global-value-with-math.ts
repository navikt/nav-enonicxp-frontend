import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroGlobalValueWithMathProps extends MacroPropsCommon {
    name: MacroType.GlobalValue;
    config: {
        global_value_with_math: {
            variables: number[];
            expression: string;
            decimals?: number;
        };
    };
}
