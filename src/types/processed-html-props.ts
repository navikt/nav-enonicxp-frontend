import { MacroPropsCommon } from './macro-props/_macros-common';

export const processedHtmlMacroTag = 'editor-macro';

export type ProcessedHtmlProps =
    | {
          processedHtml: string;
          macros: MacroPropsCommon[];
          isLegacy?: boolean;
      }
    | string;

// TODO: fjern når backend er oppgradert til Guillotine 5
export const getProcessedHtmlPropsWithBackwardsCompatibility = (
    html: ProcessedHtmlProps
) =>
    typeof html === 'string'
        ? { processedHtml: html, macros: [], isLegacy: true }
        : html;
