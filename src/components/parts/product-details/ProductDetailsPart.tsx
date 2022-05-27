import React from 'react';
import {
    ProductDetailsProps,
    ProductDetailType,
} from 'types/component-props/parts/product-details';
import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

const readableTypeStrings: { [key in ProductDetailType]: string } = {
    payout_dates: 'utbetalingsdatoer',
    processing_times: 'saksbehandlingstider',
    rates: 'satser',
};

export const ProductDetailsPart = ({ config }: ProductDetailsProps) => {
    if (!config?.detailType) {
        return (
            <EditorHelp
                text={'Velg hvilken produktdetalj-type som skal vises'}
            />
        );
    }

    const { components } = config;

    if (!components || components.length === 0) {
        return (
            <EditorHelp
                text={`Feil: Fant ingen produktdetaljer for ${
                    readableTypeStrings[config.detailType]
                }`}
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
                        // @ts-ignore (TODO: fix this :)
                        pageProps={{}}
                    />
                ))}
            </ExpandableComponentWrapper>
        </FilteredContent>
    );
};
