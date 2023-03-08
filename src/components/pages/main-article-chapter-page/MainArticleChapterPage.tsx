import React from 'react';
import { ContentType } from '../../../types/content-props/_content-common';
import { RedirectPage } from '../redirect-page/RedirectPage';
import { DynamicPage } from '../dynamic-page/DynamicPage';
import { MainArticleChapterProps } from '../../../types/content-props/main-article-chapter-props';

export const MainArticleChapterPage = (props: MainArticleChapterProps) => {
    if (props.data?.article?.type !== ContentType.MainArticle) {
        return <RedirectPage {...props} />;
    }

    return <DynamicPage {...props} />;
};
