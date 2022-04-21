/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';

import { ProductDetailsProps } from 'types/component-props/parts/productDetails';
import { usePageConfig } from 'store/hooks/usePageConfig';

export const ProductDetailsPart = ({ config }: ProductDetailsProps) => {
    const { pageConfig } = usePageConfig();

    if (!config?.productDetailsTarget && pageConfig.editorView) {
        return <div>Velg produktdetaljer fra listen</div>;
    }

    if (!config?.productDetailsTarget && !pageConfig.editorView) {
        return null;
    }

    return <div>[Placeholder for produktdetaljer]</div>;
};
