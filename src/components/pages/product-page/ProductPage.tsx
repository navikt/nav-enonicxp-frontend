import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import {
    SituationPageProps,
    ProductPageProps,
} from '../../../types/content-props/dynamic-page-props';
import { ProductPageHeader } from './header/ProductPageHeader';
import { BEM, classNames } from '../../../utils/classnames';
import { ContentType } from '../../../types/content-props/_content-common';
import './ProductPage.less';

const bem = BEM('product-page');

export const ProductPage = (props: ProductPageProps | SituationPageProps) => {
    const { data, page, __typename: type } = props;

    const { label } = data;

    const title = data.title || page.config.title;

    return (
        <div
            className={classNames(
                bem(),
                type === ContentType.ProductPage && bem(undefined, 'product'),
                type === ContentType.SituationPage &&
                    bem(undefined, 'situation')
            )}
        >
            <ProductPageHeader pageType={type} label={label}>
                {title}
            </ProductPageHeader>
            <ComponentMapper componentProps={props.page} pageProps={props} />
        </div>
    );
};
