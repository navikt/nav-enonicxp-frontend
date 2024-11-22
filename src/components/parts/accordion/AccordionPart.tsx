import React from 'react';
import { Accordion } from 'components/_common/accordion/Accordion';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ComponentEditorProps } from 'components/ComponentMapper';

export type PartConfigAccordion = {
    accordion: Array<{
        title: string;
        anchorId?: string;
        html: ProcessedHtmlProps;
    }>;
    editorProps?: ComponentEditorProps;
};

export const AccordionPart = ({
    config,
    editorProps,
}: PartComponentProps<PartType.Accordion> & { editorProps?: ComponentEditorProps }) => {
    if (!config?.accordion || config.accordion.length === 0) {
        return <EditorHelp text={'Kortet mangler innhold'} />;
    }

    const { accordion } = config;

    return <Accordion accordion={accordion} editorProps={editorProps} />;
};
