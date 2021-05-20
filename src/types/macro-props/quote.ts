import { MacroPropsCommon, MacroType } from './_macros-common';

interface QuoteMacroProps extends MacroPropsCommon {
    descriptor: MacroType.Quote;
    config: {
        quote: string;
    };
}
