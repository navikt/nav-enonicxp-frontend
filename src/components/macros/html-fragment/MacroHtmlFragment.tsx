import React from 'react';
import { MacroHtmlFragmentProps } from '../../../types/macro-props/html-fragment';
import { ParsedHtml } from '../../ParsedHtml';

export const MacroHtmlFragment = ({ config }: MacroHtmlFragmentProps) => {
    if (!config?.html_fragment) {
        return null;
    }

    const { processedHtml } = config.html_fragment;

    if (!processedHtml) {
        return null;
    }

    return <ParsedHtml htmlProps={processedHtml} />;
};
