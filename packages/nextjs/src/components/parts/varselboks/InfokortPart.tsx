import React from 'react';
import { Infokort } from 'components/_common/infokort/Infokort';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export type PartConfigInfokort = {
    content: ProcessedHtmlProps;
};

export const InfokortPart = ({ config }: PartComponentProps<PartType.Infokort>) => {
    if (!config) {
        return <EditorHelp text={'Infokortet er ikke konfigurert'} />;
    }

    return (
        <Infokort>
            <ParsedHtml htmlProps={config.content} />
        </Infokort>
    );
};
