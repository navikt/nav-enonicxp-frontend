import React from 'react';
import { Trekkspill } from 'components/_common/trekkspill/Trekkspill';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export type PartConfigTrekkspill = {
    trekkspill: Array<{
        title: string;
        anchorId?: string;
        html: ProcessedHtmlProps;
    }>;
};

export const TrekkspillPart = ({ config }: PartComponentProps<PartType.Trekkspill>) => {
    if (!config?.trekkspill || config.trekkspill.length === 0) {
        return <EditorHelp text={'Kortet mangler innhold'} />;
    }

    const { trekkspill } = config;

    return <Trekkspill trekkspill={trekkspill} />;
};
