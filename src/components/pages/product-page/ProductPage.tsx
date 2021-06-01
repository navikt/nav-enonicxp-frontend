import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import {
    OverviewPageProps,
    ProductPageProps,
} from '../../../types/content-props/dynamic-page-props';
import { ProductPageHeader } from './header/ProductPageHeader';

export const ProductPage = (props: ProductPageProps | OverviewPageProps) => {
    const title = props.data.title || props.page.config.title;

    return (
        <div className={'product-page'}>
            <ProductPageHeader pageType={props.__typename}>
                {title}
            </ProductPageHeader>
            <ComponentMapper componentProps={props.page} pageProps={props} />
        </div>
    );
};
