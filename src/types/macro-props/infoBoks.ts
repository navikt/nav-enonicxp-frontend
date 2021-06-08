import { MacroPropsCommon, MacroType } from './_macros-common';
import { ProcessedHtmlProps } from '../processed-html-props';

export interface MacroInfoBoksProps extends MacroPropsCommon {
    name: MacroType.InfoBoks;
    config: {
        infoBoks: {
            infoBoks: ProcessedHtmlProps;
        };
    };
}
