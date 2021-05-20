import { MacroPropsCommon, MacroName } from './_macros-common';

export interface QuoteMacroProps extends MacroPropsCommon {
    name: MacroName.Quote;
    config: {
        quote: {
            quote: string;
        };
    };
}
