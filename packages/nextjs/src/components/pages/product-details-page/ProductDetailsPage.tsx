import React from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

export const ProductDetailsPage = (props: ProductDetailsProps) => {
    if (!props.editorView && !props.noRedirect) {
        return <RedirectTo404 />;
    }

    return (
        // Samme styling som ProductPage
        <div className={'productPage'}>
            <div className={'content'}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </div>
    );
};
