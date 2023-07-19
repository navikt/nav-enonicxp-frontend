import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';
import { UsageCheck } from 'components/_editor-only/usage-check/UsageCheck';
import { ContentType } from 'types/content-props/_content-common';

export const ProductDetailsPage = (props: ProductDetailsProps) => {
    if (!props.editorView) {
        return <RedirectTo404 />;
    }

    return (
        // Samme styling som ProductPage
        <div className={'productPage'}>
            <UsageCheck id={props._id} type={ContentType.ProductDetails} />
            <div className={'content'}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
