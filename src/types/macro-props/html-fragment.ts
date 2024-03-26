import { MacroPropsCommon, MacroType } from './_macros-common';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export interface MacroHtmlFragmentProps extends MacroPropsCommon {
    name: MacroType.HtmlFragment;
    config: {
        html_fragment: {
            processedHtml: ProcessedHtmlProps;
            fragmentId: string;
        };
    };
}
