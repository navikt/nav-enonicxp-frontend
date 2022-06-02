import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ProductPageProps } from '../../../types/content-props/dynamic-page-props';
import ErrorPage404 from 'pages/404';

export const ProductDetailsPage = (props: ProductPageProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }
    return (
        // Samme styling som ProductPage
        <div className={'productPage'}>
            <div className={'content'}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
