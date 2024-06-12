import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';

import styles from './SituationPage.module.scss';

export const SituationPage = (props: SituationPageProps) => {
    return (
        <article className={styles.situationPage}>
            <div className={styles.content}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </article>
    );
};
