import { PartType } from 'types/component-props/parts';

export const scrapeProductPageForProductDetails = (
    productPage: any,
    overviewType
) => {
    const sectionComponents =
        productPage?.pageProps?.content?.page?.regions?.pageContent?.components;

    if (!sectionComponents) {
        return [];
    }

    const productDetails = sectionComponents.reduce((collection, section) => {
        const components = section.regions?.content?.components || [];
        const newComponents = [];

        components.forEach((component) => {
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
