import React from 'react';
import { DynamicNewsListProps } from '../../../types/component-props/parts/news-list';
import { ContentList } from '../../_common/content-list/ContentList';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

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
