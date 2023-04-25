import React from 'react';
import { FormDetailsProps } from 'types/component-props/parts/form-details';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormDetails } from 'components/_common/form-details/FormDetails';

export const FormDetailsPart = ({ config }: FormDetailsProps) => {
    const { targetFormDetails, ...displayConfig } = config;

    if (!targetFormDetails) {
        return <EditorHelp text={'Velg hvilken skjemadetalj som skal vises'} />;
    }
    const formDetails = targetFormDetails.data;

    return (
        <FormDetails formDetails={formDetails} displayConfig={displayConfig} />
    );
};
