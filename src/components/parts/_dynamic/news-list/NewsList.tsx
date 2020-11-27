import React from 'react';
import { DynamicNewsList } from '../../../../types/component-props/parts/news-list';
import { ContentList } from '../../../_common/content-list/ContentList';
import { LenkeNavNo } from '../../../_common/lenke/LenkeNavNo';
import { BEM } from '../../../../utils/bem';
import './NewsList.less';

const bem = BEM('news-list');

export const NewsList = ({ config }: DynamicNewsList) => {
    if (!config?.contentList) {
        return 'Tom nyhetsliste';
    }

    const { title, contentList, moreNews } = config;

    return (
        <div className={bem()}>
            <ContentList
                showDateLabel={true}
                content={contentList.target}
                maxItems={contentList.numLinks}
                title={title}
            />
            {moreNews && (
                <LenkeNavNo href={moreNews.url} className={bem('more-news')}>
                    {moreNews.text}
                </LenkeNavNo>
            )}
        </div>
    );
};
