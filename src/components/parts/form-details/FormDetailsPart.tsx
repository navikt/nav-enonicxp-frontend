import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormDetails } from 'components/_common/form-details/FormDetails';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { FormDetailsPageProps } from 'types/content-props/form-details';
import { FiltersMixin } from 'types/component-props/_mixins';

export type PartConfigFormDetails = {
    targetFormDetails: FormDetailsPageProps;
    showTitle: boolean;
    showIngress: boolean;
    showAddendums: boolean;
    showComplaints: boolean;
    showApplications: boolean;
} & FiltersMixin;

export const FormDetailsPart = ({ config }: PartComponentProps<PartType.FormDetails>) => {
    const { targetFormDetails, ...displayConfig } = config;

    if (!targetFormDetails) {
        return <EditorHelp text={'Velg hvilken skjemadetalj som skal vises'} />;
    }
    const formDetails = targetFormDetails.data;

    return (
        <FilteredContent {...config}>
            <FormDetails formDetails={formDetails} displayConfig={displayConfig} />
        </FilteredContent>
    );
};
