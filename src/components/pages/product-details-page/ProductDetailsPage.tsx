import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ProductPageProps } from '../../../types/content-props/dynamic-page-props';
import { BEM } from '../../../utils/classnames';

const bem = BEM('product-details-page');

export const ProductDetailsPage = (props: ProductPageProps) => {
    return (
        <div className={bem()}>
            <div className={bem('content')}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
