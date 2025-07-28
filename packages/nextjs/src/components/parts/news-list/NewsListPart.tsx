import React from 'react';
import { ContentList } from 'components/_common/content-list/ContentList';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ContentListMixin, ExpandableMixin } from 'types/component-props/_mixins';
import { LinkProps } from 'types/link-props';

import style from './NewsListPart.module.scss';

export type PartConfigNewsList = {
    title?: string;
    hideTitle?: boolean;
    contentList: ContentListMixin;
    moreNews?: LinkProps;
} & ExpandableMixin;

export const NewsListPart = ({ config }: PartComponentProps<PartType.NewsList>) => {
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
                    <LenkeStandalone href={moreNews.url} className={style.moreNews} withChevron>
                        {moreNews.text}
                    </LenkeStandalone>
                )}
            </div>
        </ExpandableComponentWrapper>
    );
};
