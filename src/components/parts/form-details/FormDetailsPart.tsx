import React from 'react';
import { FormDetailsProps } from 'types/component-props/parts/form-details';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormsList } from 'components/_common/form-details/FormsList';

export const FormDetailsPart = ({ config }: FormDetailsProps) => {
    const { targetFormDetails } = config;
    const formDetails = targetFormDetails.data;

    if (!targetFormDetails) {
        return (
            <EditorHelp
                text={'Velg hvilken produktdetalj-type som skal vises'}
            />
        );
    }

    return <FormsList formDetails={formDetails} />;
};
