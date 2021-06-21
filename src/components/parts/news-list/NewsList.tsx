import React from 'react';
import { DynamicNewsList } from '../../../types/component-props/parts/news-list';
import { ContentList } from '../../_common/content-list/ContentList';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { BEM } from '../../../utils/classnames';
import { Expandable } from '../../_common/expandable/Expandable';
import './NewsList.less';

const bem = BEM('news-list');

export const NewsList = ({ config }: DynamicNewsList) => {
    if (!config?.contentList) {
        return <h2>{'Tom nyhetsliste'}</h2>;
    }

    const { title, contentList, moreNews } = config;

    return (
        <Expandable {...config}>
            <div className={bem()}>
                <ContentList
                    showDateLabel={true}
                    content={contentList.target}
                    title={title}
                    withChevron={true}
                />
                {moreNews && (
                    <LenkeStandalone
                        href={moreNews.url}
                        className={bem('more-news')}
                    >
                        {moreNews.text}
                    </LenkeStandalone>
                )}
            </div>
        </Expandable>
    );
};
