import React from 'react';
import { FormDetailsProps } from '../../../types/component-props/part-configs/form-details';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { FormDetails } from 'components/_common/form-details/FormDetails';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { ContentType } from 'types/content-props/_content-common';

export const FormDetailsPart = ({ config, pageProps }: FormDetailsProps) => {
    const { targetFormDetails, ...displayConfig } = config;

    // This is a temporary solution to show the title as level 4 on product pages
    // that have been re-organized as part of the Maler 2.0.
    // When all product pages have been re-organized, we can remove the reference and
    // config for showTitleAsLevel4.
    const showTitleAsLevel4 =
        pageProps.type === ContentType.ProductPage &&
        pageProps.data?.showSubsectionNavigation;

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
            <FormDetails
                formDetails={formDetails}
                displayConfig={modifiedDisplayConfig}
            />
        </FilteredContent>
    );
};
