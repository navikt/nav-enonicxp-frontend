import { FormDetails } from 'components/_common/form-details/FormDetails';
import { MacroFormDetailsProps } from 'types/macro-props/form-details';

export const MacroFormDetails = ({ config }: MacroFormDetailsProps) => {
    const macroConfig = config?.form_details;

    if (!macroConfig || !macroConfig?.targetFormDetails?.data) {
        return null;
    }

    const formDetailsData = macroConfig?.targetFormDetails?.data;

    const displayConfig = {
        showTitle: macroConfig.showTitle,
        showIngress: macroConfig.showIngress,
        showApplications: macroConfig.showApplications,
        showAddendums: macroConfig.showAddendums,
    };

    return (
        <FormDetails
            formDetails={formDetailsData}
            displayConfig={displayConfig}
        />
    );
};
