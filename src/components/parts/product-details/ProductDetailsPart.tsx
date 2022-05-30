import React from 'react';
import { ProductDetailsProps } from 'types/component-props/parts/product-details';
import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { translator } from '../../../translations';

export const ProductDetailsPart = ({
    config,
    pageProps,
}: ProductDetailsProps) => {
    if (!config?.detailType) {
        return (
            <EditorHelp
                text={'Velg hvilken produktdetalj-type som skal vises'}
            />
        );
    }

    const detailTypeStrings = translator('productDetailTypes', 'no');

    const { components } = config;
    if (!components || components.length === 0) {
        return (
            <EditorHelp
                text={`Fant ingen produktdetaljer for ${detailTypeStrings(
                    config.detailType
                )} på denne siden. Velg produktdetaljer fra venstre-panelet i editoren (produktdetaljene må være publisert for å kunne velges).`}
                type={'error'}
            />
        );
    }

    return (
        <FilteredContent {...config}>
            <ExpandableComponentWrapper {...config}>
                {components.map((component, index) => (
                    <ComponentMapper
                        key={index}
                        componentProps={component}
                        pageProps={pageProps}
                    />
                ))}
            </ExpandableComponentWrapper>
        </FilteredContent>
    );
};
