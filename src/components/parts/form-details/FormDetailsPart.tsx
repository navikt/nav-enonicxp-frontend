import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormDetails } from 'components/_common/form-details/FormDetails';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { ContentType } from 'types/content-props/_content-common';
import { PartComponent, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { FormDetailsPageProps } from 'types/content-props/form-details';
import { FiltersMixin } from 'types/component-props/_mixins';

export type PartConfigFormDetails = {
    targetFormDetails: FormDetailsPageProps;
    showTitle: boolean;
    showIngress: boolean;
    showAddendums: boolean;
    showComplaints: boolean;
    showApplications: boolean;
} & FiltersMixin;

export const FormDetailsPart: PartComponent<PartType.FormDetails> = ({ config }) => {
    const pageProps = usePageContentProps();
    const { targetFormDetails, ...displayConfig } = config;

    // This is a temporary solution to show the title as level 4 on product pages
    // that have been re-organized as part of the Maler 2.0.
    // When all product pages have been re-organized, we can remove the reference and
    // config for showTitleAsLevel4.
    const showTitleAsLevel4 =
        pageProps.type === ContentType.ProductPage && pageProps.data?.showSubsectionNavigation;

    if (!targetFormDetails) {
        return <EditorHelp text={'Velg hvilken skjemadetalj som skal vises'} />;
    }
    const formDetails = targetFormDetails.data;

    const modifiedDisplayConfig = {
        ...displayConfig,
        showTitleAsLevel4,
    };

    return (
        <FilteredContent {...config}>
            <FormDetails formDetails={formDetails} displayConfig={modifiedDisplayConfig} />
        </FilteredContent>
    );
};
