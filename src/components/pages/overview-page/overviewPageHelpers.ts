import { PartType } from 'types/component-props/parts';
import { LayoutCommonProps} from 'types/component-props/layouts';
import { ProductDetailType } from 'types/content-props/product-details';
import { ContentProps } from 'types/content-props/_content-common';
import { PartComponentProps } from 'types/component-props/_component-common';

export const scrapeProductPageForProductDetails = (
    productPage: {pageProps: {content:ContentProps}},
    overviewType: ProductDetailType
) => {
    const sectionComponents =
        productPage?.pageProps?.content?.page?.regions['pageContent']?.components;

    if (!sectionComponents) {
        return [];
    }

    const productDetails = sectionComponents.reduce((collection, section: LayoutCommonProps) => {
        const components = section.regions?.content?.components || [] as PartComponentProps[];
        const newComponents = [];

        components.forEach((component: PartComponentProps) => {
            if (component.descriptor !== PartType.ProductDetails) {
                return;
            }

            const { productDetailsTarget } = component.config;

            if (
                !productDetailsTarget ||
                productDetailsTarget?.data?.detailType !== overviewType
            ) {
                return;
            }

            const componentRegions = productDetailsTarget.page.regions;

            Object.values(componentRegions).forEach((region: any) => {
                newComponents.push(region.components);
            });
        }, []);
        return [...collection, ...newComponents.flat()];
    }, []);

    return productDetails;
};
