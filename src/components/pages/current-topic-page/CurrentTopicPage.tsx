import React from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { FeaturedHeader } from 'components/_common/headers/featuredHeader/FeaturedHeader';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentCommonProps, ContentType } from 'types/content-props/_content-common';

import style from './CurrentTopicPage.module.scss';

export type CurrentTopicPageProps = ContentCommonProps & {
    type: ContentType.CurrentTopicPage;
    data: Pick<ProductDataMixin, 'title'>;
};

export const CurrentTopicPage = (props: CurrentTopicPageProps) => {
    return (
        <article className={style.currentTopicPage}>
            <FeaturedHeader contentProps={props} />
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
