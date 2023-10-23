import React from 'react';
import { GenericPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

import styles from './GenericPageV2.module.scss';

export const GenericPageV2 = (props: GenericPageProps) => {
    return (
        <article className={styles.genericPage}>
            <ThemedPageHeader contentProps={props} />
            <div className={styles.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </article>
    );
};
