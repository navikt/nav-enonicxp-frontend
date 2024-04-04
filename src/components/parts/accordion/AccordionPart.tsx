import React from 'react';
import { Accordion } from 'components/_common/accordion/Accordion';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponent, PartType } from 'types/component-props/parts';

export const AccordionPart: PartComponent<PartType.Accordion> = ({ config }) => {
    if (!config?.accordion || config.accordion.length === 0) {
        return <EditorHelp text={'Kortet mangler innhold'} />;
    }

    const { accordion } = config;

    return <Accordion accordion={accordion} />;
};
