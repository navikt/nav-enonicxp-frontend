import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ProductDetailsProps } from '../../../types/content-props/dynamic-page-props';
import ErrorPage404 from 'pages/404';
import { ProductDetailsUsageCheck } from './product-details-usage-check/ProductDetailsUsageCheck';

export const ProductDetailsPage = (props: ProductDetailsProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
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
