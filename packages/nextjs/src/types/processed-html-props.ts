import { MacroPropsCommon } from './macro-props/_macros-common';

export const processedHtmlMacroTag = 'editor-macro';

export type ProcessedHtmlProps = {
    processedHtml: string;
    macros: MacroPropsCommon[];
};
