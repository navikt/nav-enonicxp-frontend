import React from 'react';
import { ProductDetailsProps } from 'types/component-props/parts/product-details';
import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { translator } from '../../../translations';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import contentFilters from '../../../store/slices/filteredContent';
import pageConfig from '../../../store/slices/pageConfig';
import pathMap from '../../../store/slices/pathMap';
import gvEditorState from '../../../store/slices/gvEditorState';
import authState from '../../../store/slices/authState';

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

    const store = configureStore({
        reducer: {
            contentFilters,
            pageConfig,
            pathMap,
            gvEditorState,
            authState,
        },
    });

    return (
        <Provider store={store}>
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
        </Provider>
    );
};
