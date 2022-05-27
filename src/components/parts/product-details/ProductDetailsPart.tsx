import React from 'react';

import { ProductDetailsProps } from 'types/component-props/parts/product-details';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const ProductDetailsPart = ({ config }: ProductDetailsProps) => {
    const { pageConfig } = usePageConfig();

    if (!config?.productDetailsTarget) {
        return (
            <EditorHelp text="Velg hvilken produktdetalj-side du vil vise" />
        );
    }

    const mainRegion = config?.productDetailsTarget?.page?.regions?.['main'];

    if (!mainRegion) {
        return <EditorHelp text="Mangler hovedregion" />;
    }

    return (
        <FilteredContent {...config}>
            <ExpandableComponentWrapper {...config}>
                {mainRegion.components.map((component, index) => (
                    <ComponentMapper
                        key={index}
                        componentProps={component}
                        pageProps={config.productDetailsTarget}
                    />
                ))}
            </ExpandableComponentWrapper>
        </FilteredContent>
    );
};
