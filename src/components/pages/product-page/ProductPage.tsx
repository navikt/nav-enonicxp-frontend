import React from 'react';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';

import styles from './ProductPage.module.scss';

export const ProductPage = (props: ProductPageProps) => {
    return (
        <article className={styles.productPage}>
            <div className={styles.content}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </article>
    );
};
