import React from 'react';
import { MacroHtmlFragmentProps } from '../../../types/macro-props/html-fragment';
import { ParsedHtml } from '../../ParsedHtml';

export const MacroHtmlFragment = ({ config }: MacroHtmlFragmentProps) => {
    const htmlProps = config?.html_fragment?.processedHtml;

    if (!htmlProps) {
        return null;
    }

    console.log(
        `Parsing html from fragment ${config.html_fragment.fragmentId}`
    );

    return <ParsedHtml htmlProps={htmlProps} />;
};
