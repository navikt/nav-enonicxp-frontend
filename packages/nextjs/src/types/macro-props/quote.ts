import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroQuoteProps extends MacroPropsCommon {
    name: MacroType.Quote;
    config: {
        quote: {
            quote: string;
        };
    };
}
