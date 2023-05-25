import { FormDetails } from 'components/_common/form-details/FormDetails';
import { MacroFormDetailsProps } from 'types/macro-props/form-details';

export const MacroFormDetails = ({ config }: MacroFormDetailsProps) => {
    const formDetails = config?.form_details?.targetFormDetails?.data;
    const displayConfig = {
        showTitle: config?.form_details?.showTitle,
        showApplications: config?.form_details?.showApplications,
        showAddendums: config?.form_details?.showAddendums,
        showIngress: config?.form_details?.showTitle,
    };

    if (!formDetails) {
        return null;
    }

    return (
        <FormDetails formDetails={formDetails} displayConfig={displayConfig} />
    );
};
