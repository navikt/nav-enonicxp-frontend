import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { NewsArticlePageProps } from '../../../types/content-props/dynamic-page-props';

import styles from './NewsArticlePage.module.scss';
import classNames from 'classnames';
import { NewsHeader } from 'components/_common/headers/news-header/NewsHeader';

export const NewsArticlePage = (props: NewsArticlePageProps) => {
    return (
        <div
            className={classNames(styles.newsArticlePage, 'setWhiteBackground')}
        >
            <NewsHeader contentProps={props} />
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <ComponentMapper
                        componentProps={props.page}
                        pageProps={props}
                    />
                </div>
            </div>
        </div>
    );
};
