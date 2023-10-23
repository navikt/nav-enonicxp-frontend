import React from 'react';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

import styles from './ProductPageV2.module.scss';

export const ProductPageV2 = (props: ProductPageProps) => {
    return (
        <article className={styles.productPage}>
            <ThemedPageHeader contentProps={props} />
            <div className={styles.productPage}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </article>
    );
};