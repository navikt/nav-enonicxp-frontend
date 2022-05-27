import React from 'react';
import { ProductDetailsProps } from 'types/component-props/parts/product-details';
import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const ProductDetailsPart = ({ config }: ProductDetailsProps) => {
    if (!config?.detailType) {
        return (
            <EditorHelp
                text={'Velg hvilken produktdetalj-type som skal vises'}
            />
        );
    }

    if (!config.components || config.components.length === 0) {
        return (
            <EditorHelp
                text={'Feil: Fant ingen komponenter i produktdetaljene'}
                type={'error'}
            />
        );
    }

    return (
        <FilteredContent {...config}>
            <ExpandableComponentWrapper {...config}>
                {config.components.map((component, index) => (
                    <ComponentMapper
                        key={index}
                        componentProps={component}
                        // @ts-ignore
                        pageProps={{}}
                    />
                ))}
            </ExpandableComponentWrapper>
        </FilteredContent>
    );
};
