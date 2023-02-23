import React from 'react';
import { FormDetailsProps } from 'types/component-props/parts/form-details';
import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { translator } from '../../../translations';
import { Provider } from 'react-redux';
import { setPageConfigAction } from '../../../store/slices/pageConfig';
import { createNewStore } from '../../../store/store';
import { FormsList } from 'components/_common/form-details/FormsList';

export const FormDetailsPart = ({ config, pageProps }: FormDetailsProps) => {
    const { targetFormDetails, showApplicationForms, showComplaintForms } =
        config;
    const formDetails = targetFormDetails.data;

    if (!targetFormDetails) {
        return (
            <EditorHelp
                text={'Velg hvilken produktdetalj-type som skal vises'}
            />
        );
    }

    if (!showApplicationForms && !showComplaintForms) {
        return (
            <EditorHelp
                text={
                    'Du må velge om du vil vise søknads- og/eller klageskjemaer'
                }
            />
        );
    }

    return (
        <>
            {showApplicationForms && (
                <FormsList formDetails={formDetails} type="application" />
            )}
            {showComplaintForms && (
                <FormsList formDetails={formDetails} type="complaint" />
            )}
        </>
    );
};
