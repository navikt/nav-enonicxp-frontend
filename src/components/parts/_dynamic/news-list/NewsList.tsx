import React from 'react';
import { DynamicNewsList } from '../../../../types/component-props/parts/news-list';
import { ContentList } from '../../../_common/content-list/ContentList';
import { LenkeStandalone } from '../../../_common/lenke/LenkeStandalone';
import { BEM } from '../../../../utils/classnames';
import './NewsList.less';

const bem = BEM('news-list');

export const NewsList = ({ config }: DynamicNewsList) => {
    if (!config?.contentList) {
        return <h2>{'Tom nyhetsliste'}</h2>;
    }

    const { title, contentList, moreNews } = config;

    return (
        <div className={bem()}>
            <ContentList
                dateLabelOption={contentList.dateLabelOption}
                content={contentList.target}
                title={title}
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
    );
};
