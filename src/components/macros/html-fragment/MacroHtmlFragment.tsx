import React from 'react';
import { MacroHtmlFragmentProps } from '../../../types/macro-props/html-fragment';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';

export const MacroHtmlFragment = ({ config }: MacroHtmlFragmentProps) => {
    const htmlProps = config?.html_fragment?.processedHtml;

    if (!htmlProps) {
        return null;
    }

    return <ParsedHtml htmlProps={htmlProps} />;
};
