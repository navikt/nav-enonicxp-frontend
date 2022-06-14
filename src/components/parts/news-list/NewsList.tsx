import React from 'react';
import { DynamicNewsList } from '../../../types/component-props/parts/news-list';
import { ContentList } from '../../_common/content-list/ContentList';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';

import style from './NewsList.module.scss';

export const NewsList = ({ config }: DynamicNewsList) => {
    if (!config?.contentList) {
        return <h2>{'Tom nyhetsliste'}</h2>;
    }

    const { title, contentList, moreNews } = config;

    return (
        <ExpandableComponentWrapper {...config}>
            <div className={style.newsList}>
                <ContentList
                    showDateLabel={true}
                    content={contentList.target}
                    title={title}
                    withChevron={true}
                />
                {moreNews && (
                    <LenkeStandalone
                        href={moreNews.url}
                        className={style.moreNews}
                    >
                        {moreNews.text}
                    </LenkeStandalone>
                )}
            </div>
        </ExpandableComponentWrapper>
    );
};
