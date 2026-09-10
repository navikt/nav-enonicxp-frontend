import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { MacroHtmlFragmentProps } from 'types/macro-props/html-fragment';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

type Props = MacroHtmlFragmentProps & {
    trailingContent?: React.ReactNode;
};

// Inline text that immediately followed this macro without a line break, will become a paragraph orphan.
// We need to pass it as a trailingContent so that it's injected into the macro. Also, make sure that
// even if macro config is missing or invalid, we still render the trailingContent.
export const MacroHtmlFragment = ({ config, trailingContent }: Props) => {
    if (!config?.html_fragment) {
        return (
            <>
                <EditorHelp type={'error'} text={'Macroen mangler konfigurasjon'} />
                {trailingContent && <BodyLong spacing>{trailingContent}</BodyLong>}
            </>
        );
    }

    const htmlProps = config.html_fragment.processedHtml;
    if (!htmlProps) {
        return (
            <>
                <EditorHelp
                    type={'error'}
                    text={`Fant ikke innhold for fragmentet "${config.html_fragment.fragmentId}" - Sjekk om det er avpublisert eller arkivert`}
                    globalWarningText={'Fragment-macro mangler innhold'}
                />
                {trailingContent && <BodyLong spacing>{trailingContent}</BodyLong>}
            </>
        );
    }

    return <ParsedHtml htmlProps={htmlProps} appendContent={trailingContent} />;
};
