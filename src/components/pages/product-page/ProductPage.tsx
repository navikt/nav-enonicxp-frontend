import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ProductPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { BEM } from '../../../utils/classnames';

const bem = BEM('product-page');

export const ProductPage = (props: ProductPageProps) => {
    return (
        <div className={bem()}>
            <ThemedPageHeader contentProps={props} />
            <div className={bem('content')}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
