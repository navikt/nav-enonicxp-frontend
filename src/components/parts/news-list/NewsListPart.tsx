import React from 'react';
import { DynamicNewsListProps } from 'types/component-props/parts/news-list';
import { ContentList } from 'components/_common/content-list/ContentList';
import { LenkeStandalone } from 'components/_common/lenke/LenkeStandalone';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

import style from './NewsList.module.scss';

export const NewsListPart = ({ config }: DynamicNewsListProps) => {
    if (!config?.contentList?.target) {
        return <EditorHelp text={'Tom nyhetsliste'} />;
    }

    const { title, contentList, moreNews, hideTitle } = config;

    return (
        <ExpandableComponentWrapper {...config}>
            <div className={style.newsList}>
                <ContentList
                    showDateLabel={true}
                    content={contentList.target}
                    title={title}
                    hideTitle={hideTitle}
                    listType={'chevron'}
                />
                {moreNews && (
                    <LenkeStandalone href={moreNews.url} className={style.moreNews}>
                        {moreNews.text}
                    </LenkeStandalone>
                )}
            </div>
        </ExpandableComponentWrapper>
    );
};
