/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';

import { ProductDetailsProps } from 'types/component-props/parts/productDetails';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';

export const ProductDetailsPart = ({ config }: ProductDetailsProps) => {
    const { pageConfig } = usePageConfig();

    if (!config?.productDetailsTarget && pageConfig.editorView) {
        return <div>[Velg hvilken produktdetalj-side du vil vise]</div>;
    }

    if (!config?.productDetailsTarget && !pageConfig.editorView) {
        return null;
    }

    const mainRegion = config?.productDetailsTarget?.page?.regions['main'];

    if (!mainRegion) {
        return <div>Mangler hovedregion</div>;
    }

    return (
        <>
            {mainRegion.components.map((component, index) => (
                <ComponentMapper
                    key={index}
                    componentProps={component}
                    pageProps={config.productDetailsTarget}
                />
            ))}
        </>
    );
};
