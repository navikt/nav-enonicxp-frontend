import { FormDetails } from 'components/_common/form-details/FormDetails';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { MacroFormDetailsProps } from 'types/macro-props/form-details';

export const MacroFormDetails = ({ config }: MacroFormDetailsProps) => {
    const macroConfig = config?.form_details;
    const formDetailsData = macroConfig?.targetFormDetails?.data;

    if (!macroConfig || !formDetailsData) {
        return (
            <EditorHelp
                text="Mangler referanse til skjemadetalj, eller referansen er feil."
                globalWarningText={'Feil på skjemadetalj'}
                type={'error'}
            />
        );
    }

    const displayConfig = {
        showTitle: macroConfig.showTitle,
        showIngress: macroConfig.showIngress,
        showApplications: macroConfig.showApplications,
        showAddendums: macroConfig.showAddendums,
    };

    return <FormDetails formDetails={formDetailsData} displayConfig={displayConfig} />;
};
