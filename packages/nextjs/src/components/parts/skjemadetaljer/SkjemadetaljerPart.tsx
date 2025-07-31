import React from 'react';
import { Skjemadetaljer } from 'components/_common/skjemadetaljer/Skjemadetaljer';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { SkjemadetaljerPageProps } from 'types/content-props/skjemadetaljer';
import { FiltersMixin } from 'types/component-props/_mixins';

export type PartConfigSkjemadetaljer = {
    targetFormDetails: SkjemadetaljerPageProps;
    showTitle: boolean;
    showIngress: boolean;
    showAddendums: boolean;
    showComplaints: boolean;
    showApplications: boolean;
} & FiltersMixin;

export const SkjemadetaljerPart = ({ config }: PartComponentProps<PartType.Skjemadetaljer>) => {
    const { targetFormDetails, ...displayConfig } = config;

    if (!targetFormDetails) {
        return <EditorHelp text={'Velg hvilken skjemadetalj som skal vises'} />;
    }
    const skjemadetaljer = targetFormDetails.data;

    return (
        <FilteredContent {...config}>
            <Skjemadetaljer skjemadetaljer={skjemadetaljer} displayConfig={displayConfig} />
        </FilteredContent>
    );
};
