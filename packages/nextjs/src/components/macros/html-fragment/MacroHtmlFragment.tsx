import React from 'react';
import { MacroHtmlFragmentProps } from 'types/macro-props/html-fragment';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { EditorHelp } from '@/editor-tools/src/components/editor-help/EditorHelp';

export const MacroHtmlFragment = ({ config }: MacroHtmlFragmentProps) => {
    if (!config?.html_fragment) {
        return <EditorHelp type={'error'} text={'Macroen mangler konfigurasjon'} />;
    }

    const htmlProps = config.html_fragment.processedHtml;
    if (!htmlProps) {
        return (
            <EditorHelp
                type={'error'}
                text={`Fant ikke innhold for fragmentet "${config.html_fragment.fragmentId}" - Sjekk om det er avpublisert eller arkivert`}
                globalWarningText={'Fragment-macro mangler innhold'}
            />
        );
    }

    return <ParsedHtml htmlProps={htmlProps} />;
};
