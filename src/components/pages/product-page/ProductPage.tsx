import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

export const ProductPage = (props: ProductPageProps) => {
    return (
        <div className={'productPage'}>
            <ThemedPageHeader contentProps={props} />
            <div className={'content'}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
