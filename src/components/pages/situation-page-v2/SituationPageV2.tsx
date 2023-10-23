import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

import styles from './SituationPageV2.module.scss';

export const SituationPageV2 = (props: SituationPageProps) => {
    return (
        <article className={styles.situationPage}>
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