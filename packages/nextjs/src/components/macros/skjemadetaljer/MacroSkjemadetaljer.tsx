import { Skjemadetaljer } from 'components/_common/skjemadetaljer/Skjemadetaljer';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { MacroSkjemadetaljerProps } from 'types/macro-props/skjemadetaljer';

export const MacroSkjemadetaljer = ({ config }: MacroSkjemadetaljerProps) => {
    const macroConfig = config?.form_details;
    const skjemadetaljerData = macroConfig?.targetFormDetails?.data;

    if (!macroConfig || !skjemadetaljerData) {
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

    return <Skjemadetaljer skjemadetaljer={skjemadetaljerData} displayConfig={displayConfig} />;
};
