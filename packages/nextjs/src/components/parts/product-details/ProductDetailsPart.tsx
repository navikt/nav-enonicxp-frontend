import React from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import {
    ProcessingTimesVisibilityType,
    ProductDetailType,
} from 'types/content-props/product-details';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { Language, translator } from 'translations';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { PageContextProvider, usePageContentProps } from 'store/pageContext';
import { ComponentProps } from 'types/component-props/_component-common';
import { ExpandableMixin, FiltersMixin } from 'types/component-props/_mixins';

import style from './ProductDetailsPart.module.scss';

export type PartConfigProductDetails = {
    detailType: ProductDetailType;
    processingTimesVisibility: ProcessingTimesVisibilityType;
    // Note: these two fields are defined as a special case on the backend
    // and are not included in the Graphql schema
    components: ComponentProps[];
    language: Language;
} & ExpandableMixin &
    FiltersMixin;

export const ProductDetailsPart = ({ config }: PartComponentProps<PartType.ProductDetails>) => {
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

    const expandableType = config.detailType as unknown as ExpandableMixin['type'];
    const visibilityType = config.processingTimesVisibility;
    const getProductDetailsLabel = translator('productDetailTypes', pageContent.language);
    const getVisibilityLabel = translator('processingTimesVisibilityTypes', pageContent.language);
    const ariaLabel =
        expandableType === ProductDetailType.PROCESSING_TIMES && visibilityType
            ? `${getProductDetailsLabel(ProductDetailType.PROCESSING_TIMES)} ${getVisibilityLabel(
                  visibilityType
              )}`
            : undefined;

    return (
        <div className={style.productDetails}>
            <PageContextProvider content={pageContent}>
                <FilteredContent {...config}>
                    <ExpandableComponentWrapper
                        type={expandableType}
                        ariaLabel={ariaLabel}
                        {...config}
                    >
                        {components.map((component) => (
                            <ComponentMapper
                                key={component.path}
                                componentProps={component}
                                pageProps={pageProps}
                                isCustomNestedComponent
                            />
                        ))}
                    </ExpandableComponentWrapper>
                </FilteredContent>
            </PageContextProvider>
        </div>
    );
};
