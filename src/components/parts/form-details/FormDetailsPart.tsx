import React from 'react';
import { FormDetailsProps } from 'types/component-props/parts/form-details';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormDetails } from 'components/_common/form-details/FormDetails';

export const FormDetailsPart = ({ config }: FormDetailsProps) => {
    const {
        targetFormDetails,
        showTitle,
        showIngress,
        showAddendums,
        showApplications,
    } = config;

    if (!targetFormDetails) {
        return <EditorHelp text={'Velg hvilken skjemadetalj som skal vises'} />;
    }
    const formDetails = targetFormDetails.data;

    const displayConfig = {
        showTitle: showTitle === 'true',
        showIngress: showIngress === 'true',
        showAddendums: showAddendums === 'true',
        showApplications: showApplications === 'true',
    };

    console.log(displayConfig);

    return (
        <FormDetails formDetails={formDetails} displayConfig={displayConfig} />
    );
};
