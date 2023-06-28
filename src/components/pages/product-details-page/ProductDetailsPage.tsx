import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';
import { ProductDetailsUsageCheck } from './product-details-usage-check/ProductDetailsUsageCheck';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

export const ProductDetailsPage = (props: ProductDetailsProps) => {
    if (!props.editorView) {
        return <RedirectTo404 />;
    }

    return (
        // Samme styling som ProductPage
        <div className={'productPage'}>
            <ProductDetailsUsageCheck id={props._id} />
            <div className={'content'}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
