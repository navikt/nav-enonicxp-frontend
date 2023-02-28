import React from 'react';
import { ContentType } from '../../../../types/content-props/_content-common';
import { MainArticleProps } from '../../../../types/content-props/main-article-props';
import { MainArticleChapterProps } from '../../../../types/content-props/main-article-chapter-props';
import { MainArticleNewsPress } from './MainArticleNewsPress';
import { MainArticlePermanent } from './MainArticlePermanent';

type Props = MainArticleProps | MainArticleChapterProps;

export const MainArticle = (propsInitial: Props) => {
    const { type } = propsInitial;
    if (
        type === ContentType.MainArticle &&
        (propsInitial.data.contentType === 'news' ||
            propsInitial.data.contentType === 'pressRelease')
    ) {
        return <MainArticleNewsPress {...propsInitial} />;
    }

    return <MainArticlePermanent {...propsInitial} />;
};
