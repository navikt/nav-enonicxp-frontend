import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ProductPageProps } from '../../../types/content-props/dynamic-page-props';
import { BEM } from '../../../utils/classnames';
import ErrorPage404 from 'pages/404';

const bem = BEM('product-details-page');

export const ProductDetailsPage = (props: ProductPageProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }
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
