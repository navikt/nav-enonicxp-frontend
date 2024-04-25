import { FormDetails } from 'components/_common/form-details/FormDetails';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { usePageContentProps } from 'store/pageContext';
import { ContentType } from 'types/content-props/_content-common';
import { MacroFormDetailsProps } from 'types/macro-props/form-details';

export const MacroFormDetails = ({ config }: MacroFormDetailsProps) => {
    const pageProps = usePageContentProps();
    const macroConfig = config?.form_details;
    const formDetailsData = macroConfig?.targetFormDetails?.data;

    // This is a temporary solution to show the title as level 4 on product pages
    // that have been re-organized as part of the Maler 2.0.
    // When all product pages have been re-organized, we can remove the reference and
    // config for showTitleAsLevel4.
    const showTitleAsLevel4 =
        pageProps.type === ContentType.ProductPage && pageProps.data?.showSubsectionNavigation;

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
        showTitleAsLevel4,
    };

    return <FormDetails formDetails={formDetailsData} displayConfig={displayConfig} />;
};
