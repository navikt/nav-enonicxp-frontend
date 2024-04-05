import React from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { CurrentTopicPageProps } from 'types/content-props/dynamic-page-props';
import { NewsHeader } from 'components/_common/headers/featured-header/FeaturedHeader';

import style from './CurrentTopicPage.module.scss';

export const CurrentTopicPage = (props: CurrentTopicPageProps) => {
    return (
        <article className={style.currentTopicPage}>
            <NewsHeader contentProps={props} />
            <div className={style.contentWrapper}>
                <div className={style.contentAligner}>
                    <div className={style.content}>
                        <ComponentMapper componentProps={props.page} pageProps={props} />
                    </div>
                </div>
            </div>
        </article>
    );
};
