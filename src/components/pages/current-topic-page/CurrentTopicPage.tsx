import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { CurrentTopicPageProps } from '../../../types/content-props/dynamic-page-props';

import classNames from 'classnames';
import { NewsHeader } from 'components/_common/headers/featured-header/FeaturedHeader';
import styles from './CurrentTopicPage.module.scss';

export const CurrentTopicPage = (props: CurrentTopicPageProps) => {
    return (
        <div
            className={classNames(
                styles.currentTopicPage,
                'setWhiteBackground'
            )}
        >
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
        </div>
    );
};
