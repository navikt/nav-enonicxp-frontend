import React from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { ProductDetailType } from 'types/content-props/product-details';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { translator } from 'translations';
import { PartComponent, PartType } from 'types/component-props/parts';
import { PageContextProvider, usePageContentProps } from 'store/pageContext';

export const ProductDetailsPart: PartComponent<PartType.ProductDetails> = ({ config }) => {
    const pageProps = usePageContentProps();

    if (!config?.detailType) {
        return <EditorHelp text={'Velg hvilken produktdetalj-type som skal vises'} />;
    }

    const detailTypeStrings = translator('productDetailTypes', 'no');

    const { components } = config;
    if (!components || components.length === 0) {
        const processingTimeHelptext =
            'Hvis du har angitt å vise kun klage, pass på at det ligger tekst i layout-seksjonen for klage i produktdetaljen.';
        return (
            <EditorHelp
                text={`Fant ingen produktdetaljer for ${detailTypeStrings(
                    config.detailType
                )} på denne siden. Pass på at du har valgt produktdetaljer fra venstre-panelet i editoren (produktdetaljene må være publisert for å kunne velges). ${
                    config.detailType === ProductDetailType.PROCESSING_TIMES &&
                    processingTimeHelptext
                }`}
                globalWarningText={'Komponent for produktdetaljer mangler innhold'}
                type={'error'}
            />
        );
    }

    // Wrap the product detail components in its own store provider, to ensure the correct language state is used
    const pageContent = {
        ...pageProps,
        language: config.language,
        isPagePreview: false,
    };

    return (
        <PageContextProvider content={pageContent}>
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
        </PageContextProvider>
    );
};
