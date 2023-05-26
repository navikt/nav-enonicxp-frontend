import { FormDetails } from 'components/_common/form-details/FormDetails';
import { MacroFormDetailsProps } from 'types/macro-props/form-details';

export const MacroFormDetails = ({ config }: MacroFormDetailsProps) => {
    const macroConfig = config?.form_details;
    const formDetailsData = macroConfig?.targetFormDetails?.data;

    if (!macroConfig || !formDetailsData) {
        return null;
    }

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
