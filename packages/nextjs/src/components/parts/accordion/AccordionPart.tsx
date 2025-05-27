import React from 'react';
import { Accordion } from 'components/_common/accordion/Accordion';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export type PartConfigAccordion = {
    accordion: Array<{
        title: string;
        anchorId?: string;
        html: ProcessedHtmlProps;
    }>;
};

export const AccordionPart = ({ config }: PartComponentProps<PartType.Accordion>) => {
    if (!config?.accordion || config.accordion.length === 0) {
        return <EditorHelp text={'Kortet mangler innhold'} />;
    }

    const { accordion } = config;

    return <Accordion accordion={accordion} />;
};
