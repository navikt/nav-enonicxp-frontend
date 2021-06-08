import { MacroPropsCommon, MacroType } from './_macros-common';
import { ProcessedHtmlProps } from '../processed-html-props';

export interface MacroVarselBoksProps extends MacroPropsCommon {
    name: MacroType.VarselBoks;
    config: {
        varselBoks: {
            varselBoks: ProcessedHtmlProps;
        };
    };
}
