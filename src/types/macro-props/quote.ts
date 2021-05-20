import { MacroPropsCommon, MacroType } from './_macros-common';

export interface QuoteMacroProps extends MacroPropsCommon {
    name: MacroType.Quote;
    config: {
        quote: {
            quote: string;
        };
    };
}
