import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { CurrentTopicPageProps } from 'types/content-props/dynamic-page-props';
import { NewsHeader } from 'components/_common/headers/featured-header/FeaturedHeader';

import styles from './CurrentTopicPageV2.module.scss';

export const CurrentTopicPageV2 = (props: CurrentTopicPageProps) => {
    return (
        <article className={styles.currentTopicPage}>
            <NewsHeader contentProps={props} />
            <div className={styles.contentWrapper}>
                <div className={styles.contentAligner}>
                    <div className={styles.content}>
                        <ComponentMapper
                            componentProps={props.page}
                            pageProps={props}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};
